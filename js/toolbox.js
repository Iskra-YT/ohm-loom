import { Battery } from "./elements/battery.js";
import { Draw, getPoint } from "./draw.js";

document.querySelector("#battery").addEventListener("click", () => {
    Draw.append(new Battery(getPoint(5), getPoint(3)));
});

document.querySelector("#delete").addEventListener("click", () => {
    for (const el of Draw.getList()) {
        Draw.remove(el);
    }
});
