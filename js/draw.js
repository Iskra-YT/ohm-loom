export class Drawable {
    constructor(x, y, w, h, color = "white") {
        this.x = x;
        this.y = y;

        this.w = w;
        this.h = h;

        this.color = color;
    }

    contains(px, py) {
        return (
            px >= this.x &&
            px <= this.x + this.w &&
            py >= this.y &&
            py <= this.y + this.h
        );
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

export class Draw {
    static #drawList = [];

    static append(drawable) {
        Draw.#drawList.push(drawable);
    }

    static getList() {
        return Draw.#drawList;
    }

    static remove(drawable) {
        Draw.#drawList = Draw.#drawList.filter((el) => el !== drawable);
    }
}

export function getPoint(n) {
    return n * 24;
}
