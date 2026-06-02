import { OhmElement } from "./element.js";

export class Joint extends OhmElement {
    constructor(x, y) {
        super(x, y, 0, 0);
        this.terminals = [{ x: 0, y: 0 }];
    }

    draw(ctx) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
        ctx.fill();
    }

    contains(px, py) {
        const dist2 = (px - this.x) ** 2 + (py - this.y) ** 2;
        return dist2 < 100;
    }
}
