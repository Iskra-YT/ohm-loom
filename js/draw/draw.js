import { Cable } from "../elements/cable.js";
import { OhmElement } from "../elements/element.js";
import { buildNodes } from "../terminals.js";

export class Draw {
    static #drawList = [];
    static nodes = [];

    static append(drawable) {
        Draw.#drawList.push(drawable);
        Draw.rebuildNodes();
    }

    static remove(drawable) {
        Draw.#drawList = Draw.#drawList.filter(el => el !== drawable);
        Draw.rebuildNodes();
    }

    static getList() {
        return Draw.#drawList;
    }

    static rebuildNodes() {
        const elements = Draw.#drawList.filter(
            el => el instanceof OhmElement
        );

        const cables = Draw.#drawList.filter(
            el => el instanceof Cable
        );

        Draw.nodes = buildNodes(elements, cables);
        console.log("Nodes rebuilt:", Draw.nodes);
    }
}

export function getPoint(n) {
    return n * 24;
}
