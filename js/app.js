import { Draw } from "./draw.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function draw() {
    Draw.getList().forEach(el => {
        ctx.fillStyle = el.color;
        ctx.fillRect(el.x, el.y, el.w, el.h);
    });
}

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    draw();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
window.addEventListener("click" , resizeCanvas);
