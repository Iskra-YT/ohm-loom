import { OhmElement } from "./element.js";

export class Battery extends OhmElement {
    constructor(x, y) {
        super(x, y, 50, 100);
    }

    draw(ctx) {
        ctx.fillStyle = "#3b82f6";

        ctx.fillRect(
            this.x,
            this.y,
            this.w,
            this.h
        );
    }
}