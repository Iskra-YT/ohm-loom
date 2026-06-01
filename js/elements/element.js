import { Drawable } from "../draw/drawable.js";

let nextElementId = 0;

export class OhmElement extends Drawable {
    current = 0; // A

    constructor(x, y, w, h) {
        super(x, y, w, h);

        this.id = nextElementId++;
        this.terminals = [];
    }

    getTerminalPos(index) {
        const t = this.terminals[index];
        if (!t) return null;
        return {
            x: this.x + t.x,
            y: this.y + t.y,
        };
    }

    getTerminalAt(px, py) {
        for (let i = 0; i < this.terminals.length; i++) {
            const pos = this.getTerminalPos(i);
            const dist = Math.sqrt((pos.x - px) ** 2 + (pos.y - py) ** 2);
            if (dist < 10) return i;
        }
        return -1;
    }

    getNodes() {
        return this.terminals.map((t) => t.node);
    }
}
