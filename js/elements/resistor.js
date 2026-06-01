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
        ctx.fillStyle = "#fbbf24";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = "black";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${this.resistance} Ω`, this.x + this.w / 2, this.y + this.h / 2 + 5);

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
            ctx.fillText(`${(Math.abs(this.current) * 1000).toFixed(1)} mA`, this.x, this.y - 10);
        }
    }
}