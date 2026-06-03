import { OhmElement } from "./element.js";

export class LED extends OhmElement {
    resistance = 10; // Ohm
    forwardVoltage = 2.0; // V
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
        const cx = this.x + 25;
        const cy = this.y + 25;

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(cx, this.y);
        ctx.lineTo(cx, cy - 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx, cy + 10);
        ctx.lineTo(cx, this.y + 50);
        ctx.stroke();

        ctx.fillStyle = this.isOn ? "#ff0000" : "transparent";
        ctx.beginPath();
        ctx.moveTo(cx - 15, cy - 10);
        ctx.lineTo(cx + 15, cy - 10);
        ctx.lineTo(cx, cy + 10);
        ctx.closePath();
        if (this.isOn) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "red";
            ctx.fill();
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.moveTo(cx - 15, cy + 10);
        ctx.lineTo(cx + 15, cy + 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx + 15, cy - 5);
        ctx.lineTo(cx + 25, cy - 15);
        ctx.moveTo(cx + 22, cy - 15);
        ctx.lineTo(cx + 25, cy - 15);
        ctx.lineTo(cx + 25, cy - 12);
        
        ctx.moveTo(cx + 20, cy);
        ctx.lineTo(cx + 30, cy - 10);
        ctx.moveTo(cx + 27, cy - 10);
        ctx.lineTo(cx + 30, cy - 10);
        ctx.lineTo(cx + 30, cy - 7);
        ctx.stroke();

        ctx.fillStyle = "white";
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}
