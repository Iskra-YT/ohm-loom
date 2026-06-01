import { OhmElement } from "./element.js";

export class Ground extends OhmElement {
    constructor(x, y) {
        super(x, y, 40, 40);
        this.terminals = [
            { x: 20, y: 0 }
        ];
    }

    draw(ctx) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        const cx = this.x + 20;
        const cy = this.y;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 15, cy + 20);
        ctx.lineTo(cx + 15, cy + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 10, cy + 25);
        ctx.lineTo(cx + 10, cy + 25);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 5, cy + 30);
        ctx.lineTo(cx + 5, cy + 30);
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(cx, cy, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}
