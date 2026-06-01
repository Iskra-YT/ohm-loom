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
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;

        const cx = this.x + 25;
        
        ctx.beginPath();
        ctx.moveTo(cx, this.y);
        ctx.lineTo(cx, this.y + 40);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx - 20, this.y + 40);
        ctx.lineTo(cx + 20, this.y + 40);
        ctx.stroke();

        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - 10, this.y + 60);
        ctx.lineTo(cx + 10, this.y + 60);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, this.y + 60);
        ctx.lineTo(cx, this.y + 100);
        ctx.stroke();

        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${this.voltage}V`, this.x + this.w / 2 + 30, this.y + this.h / 2 + 5);

        ctx.fillStyle = "white";
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        if (this.current !== 0) {
            ctx.fillStyle = "#3b82f6";
            ctx.font = "12px Arial";
            ctx.textAlign = "left";
            ctx.fillText(`${(Math.abs(this.current) * 1000).toFixed(1)} mA`, this.x + this.w + 5, this.y + this.h / 2);
        }
    }
}