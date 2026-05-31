import { OhmElement } from "./element.js";

export class Resistor extends OhmElement {
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
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}