import { OhmElement } from "./element.js";

export class Capacitor extends OhmElement {
    capacitance = 0.000001; // 1uF
    resistance = 1e12;

    constructor(x, y) {
        super(x, y, 60, 40);
        this.terminals = [
            { x: 0, y: 20 },
            { x: 60, y: 20 }
        ];
    }

    draw(ctx) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        const cy = this.y + 20;

        ctx.beginPath();
        ctx.moveTo(this.x, cy);
        ctx.lineTo(this.x + 25, cy);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x + 35, cy);
        ctx.lineTo(this.x + 60, cy);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x + 25, cy - 15);
        ctx.lineTo(this.x + 25, cy + 15);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x + 35, cy - 15);
        ctx.lineTo(this.x + 35, cy + 15);
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${(this.capacitance * 1e6).toFixed(1)} µF`, this.x + this.w / 2, this.y + this.h / 2 + 30);

        ctx.fillStyle = "white";
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}
