import { OhmElement } from "./element.js";

export class LED extends OhmElement {
    resistance = 20; // Ohm
    maxCurrent = 0.02; // 20 mA
    isOn = false;

    constructor(x, y) {
        super(x, y, 50, 50);
        this.terminals = [
            { x: 25, y: 0 },
            { x: 25, y: 50 }
        ];
    }

    draw(ctx) {
        ctx.fillStyle = this.isOn ? "#ff0000" : "#7f0000";
        ctx.beginPath();
        ctx.arc(this.x + 25, this.y + 25, 20, 0, Math.PI * 2);
        ctx.fill();

        if (this.isOn) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "red";
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        ctx.fillStyle = "black";
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        if (this.current !== 0) {
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.fillText(`${(this.current * 1000).toFixed(1)} mA`, this.x + 55, this.y + 30);
        }
    }
}
