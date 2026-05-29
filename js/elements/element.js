export class OhmElement {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        throw new Error("draw() must be implemented");
    }
}