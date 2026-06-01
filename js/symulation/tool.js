import { Draw } from "../draw/draw.js";

export function calculateNodeCount() {
    const nodeSet = new Set();

    for (const component of Draw.netlist) {
        for (const node of component.nodes) {
            nodeSet.add(node);
        }
    }

    return nodeSet.size;
}
