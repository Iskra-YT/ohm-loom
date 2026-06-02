import { OhmElement } from "./element.js";

export class Resistor extends OhmElement {
    resistance = 1000; // Ohm

    constructor(x, y) {
        super(x, y, 100, 40);
        this.terminals = [
            { x: 0, y: 20 },
            { x: 100, y: 20 }
        ];
    }

    draw(ctx) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y + 20);
        ctx.lineTo(this.x + 20, this.y + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x + 80, this.y + 20);
        ctx.lineTo(this.x + 100, this.y + 20);
        ctx.stroke();

        ctx.strokeRect(this.x + 20, this.y + 10, 60, 20);

        ctx.fillStyle = "white";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${this.resistance} Ω`, this.x + this.w / 2, this.y + this.h / 2 + 25);

        ctx.fillStyle = "white";
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}