export class Drawable {
    x;
    y;

    w;
    h;

    color;

    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
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
}

export function getPoint(n) {
    return n * 24;
}