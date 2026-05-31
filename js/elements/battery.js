import { OhmElement } from "./element.js";

export class Battery extends OhmElement {
    voltage = 9; // V

    constructor(x, y) {
        super(x, y, 50, 100);
        this.terminals = [
            { x: 25, y: 0 },
            { x: 25, y: 100 }
        ];
    }

    draw(ctx) {
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = "black";
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}