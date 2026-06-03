import { Draw } from "../draw/draw.js";
import { calculateNodeCount } from "./tool.js";
import { DamagedNode } from "../elements/damaged.js";

export function circuitSolver() {
    try {
        const pass1 = solveMNA([]);
        if (!pass1) return;

        const activeLEDs = [];
        Draw.netlist.forEach(component => {
            if (component.type === "LED") {
                const [n1, n2] = component.nodes;
                if (n1 !== undefined && n2 !== undefined) {
                    const vDiff = pass1.voltages[n1] - pass1.voltages[n2];
                    if (vDiff > component.element.forwardVoltage) {
                        activeLEDs.push(component);
                    }
                }
            }
        });

        const pass2 = solveMNA(activeLEDs);
        if (!pass2) return;

        const { voltages, solution, N, voltageSources } = pass2;

        let anyBroken = false;
        let batteryIdx = 0;
        let activeLedIdx = 0;

        Draw.netlist.forEach(component => {
            const [n1, n2] = component.nodes;
            if (n1 === undefined || n2 === undefined) {
                component.element.current = 0;
                if (component.type === "LED") component.element.isOn = false;
                return;
            }

            const v1 = voltages[n1];
            const v2 = voltages[n2];
            const vDiff = v1 - v2;
            
            if (component.type === "LED") {
                const led = component.element;
                if (activeLEDs.includes(component)) {
                    const mIdx = N + voltageSources.length + activeLedIdx++;
                    led.current = solution[mIdx];
                    led.isOn = led.current > 1e-6;
                } else {
                    led.current = 0;
                    led.isOn = false;
                }

                if (Math.abs(led.current) > led.maxCurrent) {
                    const damaged = new DamagedNode(led.x, led.y, led.w, led.h, led.terminals, led.id);
                    Draw.replace(led, damaged);
                    anyBroken = true;
                }
            } else if (component.type === "Battery") {
                const mIdx = N + batteryIdx++;
                component.element.current = solution[mIdx];
            } else if (component.element.resistance !== undefined) {
                component.element.current = vDiff / component.element.resistance;
            }
        });

        if (anyBroken) {
            throw new Error("One or more components have been damaged due to excessive current.");
        }

    } catch (e) {
        alert("Simulation error: " + e.message);
        console.error("Solver error:", e.message);
    }
}

function solveMNA(activeLEDs) {
    const totalNodes = calculateNodeCount();
    if (totalNodes < 2) {
        alert("Not enough nodes to simulate. Make sure elements are connected.");
        return null;
    }

    const nodeMapping = (n) => n - 1;
    const N = totalNodes - 1;

    const voltageSources = Draw.netlist.filter(c => c.type === "Battery");
    const M = voltageSources.length + activeLEDs.length;

    const size = N + M;
    if (size === 0) {
        alert("No components to simulate.");
        return null;
    }

    const A = Array.from({ length: size }, () => new Array(size).fill(0));
    const z = new Array(size).fill(0);

    const GMIN = 1e-15;
    for (let i = 0; i < N; i++) {
        A[i][i] += GMIN;
    }

    let mIdxOffset = 0;
    for (const component of Draw.netlist) {
        const [n1, n2] = component.nodes;
        if (n1 === undefined || n2 === undefined) continue;

        if (component.type === "Battery") {
            const mIdx = N + mIdxOffset++;
            const v = component.element.voltage;
            const r_int = component.element.internalResistance || 0.1;
            addVoltageSourceWithResistance(A, z, n1, n2, mIdx, v, r_int, nodeMapping);
        }
    }

    for (const component of Draw.netlist) {
        const [n1, n2] = component.nodes;
        if (n1 === undefined || n2 === undefined) continue;

        if (component.type === "LED" && activeLEDs.includes(component)) {
            const mIdx = N + mIdxOffset++;
            const v = component.element.forwardVoltage;
            const r = component.element.resistance || 10;
            addVoltageSourceWithResistance(A, z, n1, n2, mIdx, v, r, nodeMapping);
        }
    }

    for (const component of Draw.netlist) {
        const [n1, n2] = component.nodes;
        if (n1 === undefined || n2 === undefined) continue;

        if (component.type === "LED" && !activeLEDs.includes(component)) {
            const g = 1e-12;
            addConductance(A, n1, n2, g, nodeMapping);
        } else if (component.element.resistance !== undefined && component.type !== "Battery" && component.type !== "LED") {
            const g = 1 / component.element.resistance;
            addConductance(A, n1, n2, g, nodeMapping);
        }
    }

    try {
        const solution = solve(A, z);
        const voltages = new Array(totalNodes).fill(0);
        for (let i = 0; i < N; i++) {
            voltages[i + 1] = solution[i];
        }
        return { voltages, solution, N, voltageSources };
    } catch (e) {
        throw e;
    }
}

function addConductance(A, n1, n2, g, map) {
    const i = map(n1);
    const j = map(n2);

    if (i >= 0) A[i][i] += g;
    if (j >= 0) A[j][j] += g;
    if (i >= 0 && j >= 0) {
        A[i][j] -= g;
        A[j][i] -= g;
    }
}

function addVoltageSourceWithResistance(A, z, n1, n2, mIdx, v, r_int, map) {
    const i = map(n1);
    const j = map(n2);

    if (i >= 0) {
        A[i][mIdx] += 1;
        A[mIdx][i] += 1;
    }
    if (j >= 0) {
        A[j][mIdx] -= 1;
        A[mIdx][j] -= 1;
    }
    
    A[mIdx][mIdx] -= r_int;
    z[mIdx] = v;
}

function solve(A, b) {
    const n = b.length;
    for (let i = 0; i < n; i++) {
        let maxEl = Math.abs(A[i][i]);
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(A[k][i]) > maxEl) {
                maxEl = Math.abs(A[k][i]);
                maxRow = k;
            }
        }

        const tmpRow = A[maxRow];
        A[maxRow] = A[i];
        A[i] = tmpRow;

        const tmpB = b[maxRow];
        b[maxRow] = b[i];
        b[i] = tmpB;

        if (Math.abs(A[i][i]) < 1e-20) {
            throw new Error("Matrix is singular or near-singular. Check for short circuits or unconnected components.");
        }

        for (let k = i + 1; k < n; k++) {
            const c = -A[k][i] / A[i][i];
            for (let j = i; j < n; j++) {
                if (i === j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
            b[k] += c * b[i];
        }
    }

    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
        x[i] = b[i] / A[i][i];
        for (let k = i - 1; k >= 0; k--) {
            b[k] -= A[k][i] * x[i];
        }
    }
    return x;
}
