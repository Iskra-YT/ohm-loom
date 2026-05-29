import { Battery } from "./elements/battery.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

document.querySelector("#battery").addEventListener("click", () => {
    const battery = new Battery(15, 20);
    battery.draw(ctx);
});