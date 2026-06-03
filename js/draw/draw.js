import { Cable } from "../elements/cable.js";
import { OhmElement } from "../elements/element.js";
import { Ground } from "../elements/ground.js";
import { Battery } from "../elements/battery.js";
import { Resistor } from "../elements/resistor.js";
import { LED } from "../elements/led.js";
import { Capacitor } from "../elements/capacitor.js";
import { PolarizedCapacitor } from "../elements/polarized-capacitor.js";
import { Joint } from "../elements/joint.js";
import { buildNodes } from "../terminals.js";

const COMPONENT_MAP = {
    Battery,
    Resistor,
    LED,
    Capacitor,
    PolarizedCapacitor,
    Ground,
    Joint
};

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

    static replace(oldDrawable, newDrawable) {
        const index = Draw.#drawList.indexOf(oldDrawable);
        if (index !== -1) {
            Draw.#drawList[index] = newDrawable;
            Draw.rebuildNodes();
        }
    }

    static getList() {
        return Draw.#drawList;
    }

    static clear() {
        Draw.#drawList = [];
        Draw.rebuildNodes();
    }

    static serialize() {
        const elements = Draw.#drawList.filter(el => el instanceof OhmElement);
        const cables = Draw.#drawList.filter(el => el instanceof Cable);

        const serializedElements = elements.map(el => {
            const data = {
                type: el.constructor.name,
                id: el.id,
                x: el.x,
                y: el.y
            };
            const props = ["resistance", "voltage", "capacitance", "forwardVoltage", "maxCurrent", "internalResistance"];
            props.forEach(p => {
                if (el[p] !== undefined) data[p] = el[p];
            });
            return data;
        });

        const serializedCables = cables.map(c => ({
            from: { elementId: c.from.element.id, terminalIndex: c.from.terminalIndex },
            to: { elementId: c.to.element.id, terminalIndex: c.to.terminalIndex },
            points: c.points
        }));

        return JSON.stringify({ elements: serializedElements, cables: serializedCables }, null, 2);
    }

    static deserialize(json) {
        const data = JSON.parse(json);
        Draw.clear();

        const elementMap = new Map();
        let maxId = -1;

        data.elements.forEach(elData => {
            const Cls = COMPONENT_MAP[elData.type];
            if (!Cls) return;

            const el = new Cls(elData.x, elData.y);
            el.id = elData.id;
            if (el.id > maxId) maxId = el.id;

            for (const key in elData) {
                if (!["type", "id", "x", "y"].includes(key)) {
                    el[key] = elData[key];
                }
            }
            elementMap.set(el.id, el);
            Draw.#drawList.push(el);
        });

        OhmElement.setNextId(maxId + 1);

        data.cables.forEach(cData => {
            const fromEl = elementMap.get(cData.from.elementId);
            const toEl = elementMap.get(cData.to.elementId);
            if (fromEl && toEl) {
                const cable = new Cable(
                    { element: fromEl, terminalIndex: cData.from.terminalIndex },
                    { element: toEl, terminalIndex: cData.to.terminalIndex }
                );
                cable.points = cData.points || [];
                Draw.#drawList.push(cable);
            }
        });

        Draw.rebuildNodes();
    }

    static rebuildNodes() {
        const elements = Draw.#drawList.filter(
            (el) => el instanceof OhmElement,
        );

        const cables = Draw.#drawList.filter((el) => el instanceof Cable);

        let nodes = buildNodes(elements, cables);

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
