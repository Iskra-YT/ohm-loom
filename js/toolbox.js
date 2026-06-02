import { Battery } from "./elements/battery.js";
import { Resistor } from "./elements/resistor.js";
import { LED } from "./elements/led.js";
import { Ground } from "./elements/ground.js";
import { Draw, getPoint } from "./draw/draw.js";
import { circuitSolver } from "./symulation/symulation.js";
import { updateSettingsBox } from "./app.js";

document.querySelector("#battery").addEventListener("click", () => {
    Draw.append(new Battery(getPoint(5), getPoint(3)));
});

document.querySelector("#resistor").addEventListener("click", () => {
    Draw.append(new Resistor(getPoint(5), getPoint(3)));
});

document.querySelector("#led").addEventListener("click", () => {
    Draw.append(new LED(getPoint(5), getPoint(3)));
});

document.querySelector("#delete").addEventListener("click", () => {
    for (const el of [...Draw.getList()]) {
        Draw.remove(el);
    }
});

document.querySelector("#run").addEventListener("click", () => {
    Draw.buildNetlist();
    circuitSolver();
    updateSettingsBox();
});
