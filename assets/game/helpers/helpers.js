import {Coordinate} from "../model/coordinate.js";

export class Helpers {
    static uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    static getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    static buildPlayerCoordinate(area, multiplier = 1) {
        const height = area.coordinate.height;
        const width = area.coordinate.width;
        const side = width / 20 * multiplier;

        return new Coordinate((height - side) / 2, width * .1, side, side);
    }
}