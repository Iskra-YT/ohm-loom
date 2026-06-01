import { Cable } from "../elements/cable.js";
import { OhmElement } from "../elements/element.js";
import { Ground } from "../elements/ground.js";
import { buildNodes } from "../terminals.js";

export class Draw {
    static #drawList = [];
    static nodes = [];
    static netlist = [];

    static append(drawable) {
        Draw.#drawList.push(drawable);
        Draw.rebuildNodes();
    }

    static remove(drawable) {
        Draw.#drawList = Draw.#drawList.filter((el) => el !== drawable);
        Draw.rebuildNodes();
    }

    static getList() {
        return Draw.#drawList;
    }

    static rebuildNodes() {
        const elements = Draw.#drawList.filter(
            (el) => el instanceof OhmElement,
        );

        const cables = Draw.#drawList.filter((el) => el instanceof Cable);

        let nodes = buildNodes(elements, cables);

        // Find ground node and move it to index 0
        const groundNodeIndex = nodes.findIndex(node => 
            node.some(terminal => terminal.element instanceof Ground)
        );

        if (groundNodeIndex !== -1) {
            const [groundNode] = nodes.splice(groundNodeIndex, 1);
            nodes.unshift(groundNode);
        }

        Draw.nodes = nodes;

        Draw.nodes.forEach((node, nodeIndex) => {
            for (const terminal of node) {
                terminal.element.terminals[terminal.terminalIndex].node =
                    nodeIndex;
            }
        });
    }

    static buildNetlist() {
        Draw.netlist = Draw.getList()
            .filter((el) => el instanceof OhmElement && !(el instanceof Ground))
            .map((el) => ({
                type: el.constructor.name,
                element: el,
                nodes: el.getNodes(),
            }));
    }
}

export function getPoint(n) {
    return n * 24;
}
