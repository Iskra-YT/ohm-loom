import { OhmElement } from "./element.js";

export class DamagedNode extends OhmElement {
    resistance = 1e12; // Open circuit

    constructor(x, y, w, h, terminals) {
        super(x, y, w, h);
        this.terminals = terminals.map(t => ({ x: t.x, y: t.y }));
    }

    draw(ctx) {
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2;

        const padding = 10;
        const rectW = this.w - 2 * padding;
        const rectH = this.h - 2 * padding;
        const rx = this.x + padding;
        const ry = this.y + padding;

        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.moveTo(this.x + t.x, this.y + t.y);
            const targetX = Math.max(rx, Math.min(rx + rectW, this.x + t.x));
            const targetY = Math.max(ry, Math.min(ry + rectH, this.y + t.y));
            ctx.lineTo(targetX, targetY);
            ctx.stroke();
        });

        ctx.strokeRect(rx, ry, rectW, rectH);

        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx + rectW, ry + rectH);
        ctx.moveTo(rx + rectW, ry);
        ctx.lineTo(rx, ry + rectH);
        ctx.stroke();

        ctx.fillStyle = "#ef4444";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText("DAMAGED", this.x + this.w / 2, this.y + this.h + 15);

        ctx.fillStyle = "white";
        this.terminals.forEach(t => {
            ctx.beginPath();
            ctx.arc(this.x + t.x, this.y + t.y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}
