import { Draw, Drawable, getPoint } from "../draw.js";
import { OhmElement } from "./element.js";

export class Battery extends OhmElement {
    draw() {
        Draw.append(new Drawable(getPoint(this.x), getPoint(this.y), getPoint(3), getPoint(3), "blue"));
    }
}