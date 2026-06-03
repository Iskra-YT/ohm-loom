import { Draw } from "./draw/draw.js";
import { Cable } from "./elements/cable.js";
import { OhmElement } from "./elements/element.js";
import { Joint } from "./elements/joint.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let dragged = null;
let selected = null;
let wiringFrom = null;
let mousePos = { x: 0, y: 0 };
let isShiftPressed = false;

window.addEventListener("keydown", (e) => {
    if (e.key === "Shift") isShiftPressed = true;
});

window.addEventListener("keyup", (e) => {
    if (e.key === "Shift") isShiftPressed = false;
});

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Draw.getList().forEach(el => {
        if (el === selected) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#d0bcff";
            el.draw(ctx);
            ctx.shadowBlur = 0;
        } else {
            el.draw(ctx);
        }
    });

    if (wiringFrom) {
        const start = wiringFrom.element.getTerminalPos(wiringFrom.terminalIndex);
        let targetX = mousePos.x;
        let targetY = mousePos.y;

        if (isShiftPressed) {
            if (Math.abs(mousePos.x - start.x) > Math.abs(mousePos.y - start.y)) {
                targetY = start.y;
            } else {
                targetX = start.x;
            }
        }

        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

export function updateSettingsBox() {
    const infoPanel = document.querySelector("#info");
    const box = document.querySelector("#settings-box");
    const content = document.querySelector("#settings-content");
    const title = document.querySelector("#settings-title");
    const infoBox = document.querySelector("#info-box");
    const infoContent = document.querySelector("#info-content");

    if (!selected || !(selected instanceof OhmElement)) {
        infoPanel.style.display = "none";
        return;
    }

    infoPanel.style.display = "flex";

    if (selected.current !== undefined) {
        infoBox.style.display = "block";
        const currentMA = (Math.abs(selected.current) * 1000).toFixed(4);
        const v = selected.voltage !== undefined ? selected.voltage : Math.abs(selected.current * (selected.resistance || 0));
        const powerW = (Math.abs(selected.current) * v).toFixed(4);
        
        infoContent.innerHTML = `
            <div class="info-item">Current: <span class="info-value-success">${currentMA} mA</span></div>
            <div class="info-item">Power: <span class="info-value-warning">${powerW} W</span></div>
        `;
    } else {
        infoBox.style.display = "none";
    }

    const props = [];
    if (selected.voltage !== undefined) props.push({ label: "Voltage (V)", key: "voltage" });
    if (selected.resistance !== undefined) props.push({ label: "Resistance (Ω)", key: "resistance" });
    if (selected.capacitance !== undefined) props.push({ label: "Capacitance (F)", key: "capacitance", step: 0.000001 });
    if (selected.forwardVoltage !== undefined) props.push({ label: "Forward Voltage (V)", key: "forwardVoltage", step: 0.1 });
    if (selected.maxCurrent !== undefined) props.push({ label: "Max Current (A)", key: "maxCurrent", step: 0.001 });

    if (props.length === 0) {
        box.style.display = "none";
        return;
    }

    box.style.display = "block";
    title.innerText = selected.constructor.name + " Settings";
    content.innerHTML = "";

    props.forEach(prop => {
        const div = document.createElement("div");
        div.className = "settings-item";
        div.innerHTML = `
            <label>${prop.label}</label>
            <input type="number" step="${prop.step || 1}" value="${selected[prop.key]}">
        `;
        const input = div.querySelector("input");
        input.addEventListener("input", (e) => {
            selected[prop.key] = parseFloat(e.target.value) || 0;
            // TODO: trigger re-simulation if desired
        });
        content.appendChild(div);
    });
}

resizeCanvas();
render();

window.addEventListener("resize", () => {
    resizeCanvas();
    render();
});

window.addEventListener("click" , () => {
    render();
});

canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();

    let mx = e.clientX - rect.left;
    let my = e.clientY - rect.top;

    if (e.button === 2) {
        const list = Draw.getList();
        for (let i = list.length - 1; i >= 0; i--) {
            const el = list[i];
            if (el.contains(mx, my)) {
                if (el instanceof Cable) {
                    const pointIndex = el.getPointAt(mx, my);
                    if (pointIndex !== -1) {
                        el.removePoint(pointIndex);
                        return;
                    }
                }

                if (el === selected) {
                    selected = null;
                    updateSettingsBox();
                }
                if (el instanceof OhmElement) {
                    const cables = list.filter(item => 
                        item instanceof Cable && (item.from.element === el || item.to.element === el)
                    );
                    cables.forEach(c => Draw.remove(c));
                }
                Draw.remove(el);
                break;
            }
        }
        wiringFrom = null;
        return;
    }

    if (e.button === 0) {
        for (const el of Draw.getList()) {
            if (el instanceof OhmElement) {
                const terminalIndex = el.getTerminalAt(mx, my);
                if (terminalIndex !== -1) {
                    if (!wiringFrom) {
                        wiringFrom = { element: el, terminalIndex };
                    } else {
                        if (wiringFrom.element !== el || wiringFrom.terminalIndex !== terminalIndex) {
                            let targetX = mx;
                            let targetY = my;
                            if (isShiftPressed) {
                                const start = wiringFrom.element.getTerminalPos(wiringFrom.terminalIndex);
                                if (Math.abs(mx - start.x) > Math.abs(my - start.y)) {
                                    targetY = start.y;
                                } else {
                                    targetX = start.x;
                                }
                            }
                            Draw.append(new Cable(wiringFrom, { element: el, terminalIndex }));
                        }
                        wiringFrom = null;
                    }
                    return;
                }
            }
        }

        let found = false;
        const list = Draw.getList();
        for (let i = list.length - 1; i >= 0; i--) {
            const el = list[i];
            if (el.contains(mx, my)) {
                dragged = el;
                selected = el;
                found = true;
                wiringFrom = null;

                if (el instanceof Cable) {
                    let pointIndex = el.getPointAt(mx, my);
                    if (pointIndex === -1) {
                        const segmentIndex = el.getSegmentAt(mx, my);
                        el.addPoint(mx, my, segmentIndex);
                        pointIndex = segmentIndex;
                    }
                    el.draggingPointIndex = pointIndex;
                }
                break;
            }
        }

        if (!found) {
            if (wiringFrom) {
                let targetX = mx;
                let targetY = my;
                if (isShiftPressed) {
                    const start = wiringFrom.element.getTerminalPos(wiringFrom.terminalIndex);
                    if (Math.abs(mx - start.x) > Math.abs(my - start.y)) {
                        targetY = start.y;
                    } else {
                        targetX = start.x;
                    }
                }
                const joint = new Joint(targetX, targetY);
                Draw.append(joint);
                Draw.append(new Cable(wiringFrom, { element: joint, terminalIndex: 0 }));
                wiringFrom = { element: joint, terminalIndex: 0 };
                found = true;
            } else {
                selected = null;
            }
        }
        updateSettingsBox();
    }
});

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;

    if (dragged) {
        if (dragged instanceof Cable) {
            if (dragged.draggingPointIndex !== -1) {
                dragged.points[dragged.draggingPointIndex].x = mousePos.x;
                dragged.points[dragged.draggingPointIndex].y = mousePos.y;
            }
        } else {
            dragged.x = mousePos.x;
            dragged.y = mousePos.y;
        }
    }

    render();
});

window.addEventListener("mouseup", () => {
    if (dragged instanceof Cable) {
        dragged.draggingPointIndex = -1;
    }
    dragged = null;
});

function loop() {
    render();
    requestAnimationFrame(loop);
}

loop();