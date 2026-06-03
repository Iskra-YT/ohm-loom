import { Battery } from "./elements/battery.js";
import { Resistor } from "./elements/resistor.js";
import { LED } from "./elements/led.js";
import { Capacitor } from "./elements/capacitor.js";
import { PolarizedCapacitor } from "./elements/polarized-capacitor.js";
import { Ground } from "./elements/ground.js";
import { Draw, getPoint } from "./draw/draw.js";
import { circuitSolver } from "./symulation/symulation.js";
import { updateSettingsBox } from "./app.js";
import { defaultSets } from "./default-sets.js";

document.querySelector("#battery").addEventListener("click", () => {
    Draw.append(new Battery(getPoint(5), getPoint(3)));
});

document.querySelector("#resistor").addEventListener("click", () => {
    Draw.append(new Resistor(getPoint(5), getPoint(3)));
});

document.querySelector("#led").addEventListener("click", () => {
    Draw.append(new LED(getPoint(5), getPoint(3)));
});

document.querySelector("#capacitor").addEventListener("click", () => {
    Draw.append(new Capacitor(getPoint(5), getPoint(3)));
});

document.querySelector("#polarized-capacitor").addEventListener("click", () => {
    Draw.append(new PolarizedCapacitor(getPoint(5), getPoint(3)));
});

document.querySelector("#ground").addEventListener("click", () => {
    Draw.append(new Ground(getPoint(5), getPoint(3)));
});

document.querySelector("#delete").addEventListener("click", () => {
    for (const el of [...Draw.getList()]) {
        Draw.remove(el);
    }
});

document.querySelector("#download").addEventListener("click", () => {
    const json = Draw.serialize();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "circuit.json";
    a.click();
    URL.revokeObjectURL(url);
});

document.querySelector("#upload").addEventListener("click", () => {
    document.querySelector("#file-input").click();
});

document.querySelector("#file-input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            Draw.deserialize(e.target.result);
        } catch (err) {
            alert("Failed to load circuit: " + err.message);
        }
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset for next use
});

document.querySelector("#default-sets").addEventListener("change", (e) => {
    const setKey = e.target.value;
    if (setKey && defaultSets[setKey]) {
        Draw.deserialize(JSON.stringify(defaultSets[setKey]));
        e.target.value = ""; // Reset
    }
});

document.querySelector("#run").addEventListener("click", () => {
    Draw.buildNetlist();
    circuitSolver();
    updateSettingsBox();
});
