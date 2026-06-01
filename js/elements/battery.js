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

        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${this.voltage}V`, this.x + this.w / 2, this.y + this.h / 2);

        ctx.fillStyle = "black";
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        if (this.current !== 0) {
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.textAlign = "left";
            ctx.fillText(`${(Math.abs(this.current) * 1000).toFixed(1)} mA`, this.x + this.w + 5, this.y + this.h / 2);
        }
    }
}