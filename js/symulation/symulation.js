import { Draw } from "../draw/draw.js";
import { calculateNodeCount } from "./tool.js";

export function circuitSolver() {
    const totalNodes = calculateNodeCount();
    if (totalNodes < 2) {
        console.warn("Not enough nodes to simulate.");
        return;
    }

    const nodeMapping = (n) => n - 1;
    const N = totalNodes - 1;

    const voltageSources = Draw.netlist.filter(c => c.type === "Battery");
    const M = voltageSources.length;

    const size = N + M;
    const A = Array.from({ length: size }, () => new Array(size).fill(0));
    const z = new Array(size).fill(0);

    for (const component of Draw.netlist) {
        const [n1, n2] = component.nodes;

        if (component.element.resistance !== undefined) {
            const g = 1 / component.element.resistance;
            addConductance(A, n1, n2, g, nodeMapping);
        } else if (component.type === "Battery") {
            const mIdx = N + voltageSources.indexOf(component);
            const v = component.element.voltage;

            addVoltageSource(A, z, n1, n2, mIdx, v, nodeMapping);
        }
    }

    try {
        const solution = solve(A, z);
        const voltages = new Array(totalNodes).fill(0);
        for (let i = 0; i < N; i++) {
            voltages[i + 1] = solution[i];
        }

        console.log("Voltages:", voltages);
        Draw.netlist.forEach(component => {
            const [n1, n2] = component.nodes;
            const v1 = voltages[n1];
            const v2 = voltages[n2];
            
            if (component.element.resistance !== undefined) {
                component.element.current = (v1 - v2) / component.element.resistance;
                
                if (component.type === "LED") {
                    component.element.isOn = component.element.current > 0.001;
                }
            } else if (component.type === "Battery") {
                const mIdx = N + voltageSources.indexOf(component);
                component.element.current = solution[mIdx];
            }
        });

    } catch (e) {
        console.error("Solver error:", e.message);
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

function addVoltageSource(A, z, n1, n2, mIdx, v, map) {
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

        if (Math.abs(A[i][i]) < 1e-12) {
            throw new Error("Matrix is singular or near-singular");
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
