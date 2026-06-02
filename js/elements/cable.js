import { Drawable } from "../draw/drawable.js";

export class Cable extends Drawable {
    constructor(from, to) {
        super(0, 0, 0, 0);
        this.from = from;
        this.to = to;
        this.points = [];
        this.draggingPointIndex = -1;
    }

    getPoints() {
        const start = this.from.element.getTerminalPos(this.from.terminalIndex);
        const end = this.to.element.getTerminalPos(this.to.terminalIndex);
        if (!start || !end) return [];
        return [start, ...this.points, end];
    }

    draw(ctx) {
        const pts = this.getPoints();
        if (pts.length < 2) return;

        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y);
        }
        ctx.stroke();

        ctx.fillStyle = "yellow";
        for (let i = 1; i < pts.length - 1; i++) {
            ctx.beginPath();
            ctx.arc(pts[i].x, pts[i].y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    contains(px, py) {
        const pts = this.getPoints();
        if (pts.length < 2) return false;

        // Check if clicking a point
        for (let i = 1; i < pts.length - 1; i++) {
            const dist2 = (px - pts[i].x) ** 2 + (py - pts[i].y) ** 2;
            if (dist2 < 64) { // 8px radius
                return true;
            }
        }

        // Check if clicking a segment
        for (let i = 0; i < pts.length - 1; i++) {
            const start = pts[i];
            const end = pts[i + 1];

            const l2 = (start.x - end.x) ** 2 + (start.y - end.y) ** 2;
            if (l2 === 0) continue;
            let t = ((px - start.x) * (end.x - start.x) + (py - start.y) * (end.y - start.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            const dist2 = (px - (start.x + t * (end.x - start.x))) ** 2 + (py - (start.y + t * (end.y - start.y))) ** 2;
            
            if (dist2 < 25) return true;
        }

        return false;
    }

    getPointAt(px, py) {
        const pts = this.getPoints();
        for (let i = 1; i < pts.length - 1; i++) {
            const dist2 = (px - pts[i].x) ** 2 + (py - pts[i].y) ** 2;
            if (dist2 < 64) return i - 1; // index in this.points
        }
        return -1;
    }

    getSegmentAt(px, py) {
        const pts = this.getPoints();
        for (let i = 0; i < pts.length - 1; i++) {
            const start = pts[i];
            const end = pts[i + 1];

            const l2 = (start.x - end.x) ** 2 + (start.y - end.y) ** 2;
            if (l2 === 0) continue;
            let t = ((px - start.x) * (end.x - start.x) + (py - start.y) * (end.y - start.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            const dist2 = (px - (start.x + t * (end.x - start.x))) ** 2 + (py - (start.y + t * (end.y - start.y))) ** 2;
            
            if (dist2 < 25) return i;
        }
        return -1;
    }

    addPoint(x, y, segmentIndex) {
        if (segmentIndex === -1) {
            this.points.push({ x, y });
        } else {
            this.points.splice(segmentIndex, 0, { x, y });
        }
    }

    removePoint(index) {
        if (index >= 0 && index < this.points.length) {
            this.points.splice(index, 1);
        }
    }
}