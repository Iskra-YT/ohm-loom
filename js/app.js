import { Draw } from "./draw/draw.js";
import { Cable } from "./elements/cable.js";
import { OhmElement } from "./elements/element.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let dragged = null;
let wiringFrom = null;
let mousePos = { x: 0, y: 0 };

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Draw.getList().forEach(el => {
        el.draw(ctx);
    });

    if (wiringFrom) {
        const start = wiringFrom.element.getTerminalPos(wiringFrom.terminalIndex);
        ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(mousePos.x, mousePos.y);
        ctx.stroke();
        ctx.setLineDash([]);
    }
}

resizeCanvas();
render();

window.addEventListener("resize", () => {
    resizeCanvas();
    render();
});

window.addEventListener("click" , render);

canvas.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (e.button === 2) {
        const list = Draw.getList();
        for (let i = list.length - 1; i >= 0; i--) {
            const el = list[i];
            if (el.contains(mx, my)) {
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
                            Draw.append(new Cable(wiringFrom, { element: el, terminalIndex }));
                        }
                        wiringFrom = null;
                    }
                    return;
                }
            }
        }

        for (const el of Draw.getList()) {
            if (el.contains(mx, my)) {
                dragged = el;
                wiringFrom = null;
                break;
            }
        }
    }
});

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;

    if (dragged) {
        dragged.x = mousePos.x;
        dragged.y = mousePos.y;
    }

    render();
});

window.addEventListener("mouseup", () => {
    dragged = null;
});

function loop() {
    render();
    requestAnimationFrame(loop);
}

loop();