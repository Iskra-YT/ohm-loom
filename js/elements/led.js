import { OhmElement } from "./element.js";

export class LED extends OhmElement {
    constructor(x, y) {
        super(x, y, 50, 50);
        this.terminals = [
            { x: 25, y: 0 },
            { x: 25, y: 50 }
        ];
    }

    draw(ctx) {
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(this.x + 25, this.y + 25, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "black";
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}