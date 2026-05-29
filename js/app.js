import { Draw } from "./draw.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let dragged = null;

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
        for (const el of Draw.getList()) {
            if (el.contains(mx, my)) {
                Draw.remove(el);
                break;
            }
        }

        return;
    }

    if (e.button === 0) {
        for (const el of Draw.getList()) {
            if (el.contains(mx, my)) {
                dragged = el;
                break;
            }
        }
    }
});

canvas.addEventListener("mousemove", (e) => {
    if (!dragged) return;

    const rect = canvas.getBoundingClientRect();

    dragged.x = e.clientX - rect.left;
    dragged.y = e.clientY - rect.top;

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