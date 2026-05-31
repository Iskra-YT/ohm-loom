import { Drawable } from "../draw.js";

export class Cable extends Drawable {
    constructor(from, to) {
        super(0, 0, 0, 0);
        this.from = from;
        this.to = to;
    }

    draw(ctx) {
        const start = this.from.element.getTerminalPos(this.from.terminalIndex);
        const end = this.to.element.getTerminalPos(this.to.terminalIndex);

        if (!start || !end) return;

        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
    }

    contains(px, py) {
        const start = this.from.element.getTerminalPos(this.from.terminalIndex);
        const end = this.to.element.getTerminalPos(this.to.terminalIndex);

        if (!start || !end) return false;

        const l2 = (start.x - end.x) ** 2 + (start.y - end.y) ** 2;
        if (l2 === 0) return false;
        let t = ((px - start.x) * (end.x - start.x) + (py - start.y) * (end.y - start.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        const dist2 = (px - (start.x + t * (end.x - start.x))) ** 2 + (py - (start.y + t * (end.y - start.y))) ** 2;
        
        return dist2 < 25;
    }
}