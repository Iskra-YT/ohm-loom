import { UnionFind } from "./finder.js";

export function terminalId(element, terminalIndex) {
    return `${element.id}:${terminalIndex}`;
}

export function buildNodes(elements, cables) {
    const uf = new UnionFind();

    for (const element of elements) {
        for (let i = 0; i < element.terminals.length; i++) {
            uf.makeSet(terminalId(element, i));
        }
    }

    for (const cable of cables) {
        uf.union(
            terminalId(cable.from.element, cable.from.terminalIndex),
            terminalId(cable.to.element, cable.to.terminalIndex)
        );
    }

    const groups = new Map();

    for (const element of elements) {
        for (let i = 0; i < element.terminals.length; i++) {
            const id = terminalId(element, i);
            const root = uf.find(id);

            if (!groups.has(root)) {
                groups.set(root, []);
            }

            groups.get(root).push({
                element,
                terminalIndex: i
            });
        }
    }

    return [...groups.values()];
}