import {Coordinate} from "../model/coordinate.js";

export class Player {
    #area;
    #block;

    constructor(area, coordinate = new Coordinate()) {
        this.#area = area.coordinate;
        this.#block = area.add(coordinate, 'player');
    }

    get coordinate() {
        return this.#block.coordinate;
    }

    start(coordinate, step = 5) {

        if (!coordinate instanceof Coordinate) {
            throw new Error('Invalid coordinate');
        }

        this.#block.reset(coordinate);
        document.onkeydown = e => this.#animate(e, step);
    }

    stop() {
        document.onkeydown = () => {
            console.log('Game paused!');
        };
    }

    #animate(e, step) {

        switch (e.keyCode) {
            // UP
            case 38:
                if (this.coordinate.top > 0) {
                    this.#block.moveTop(step);
                }
                break;
            // RIGHT
            case 39:
                if (this.coordinate.left < this.#area.width - this.coordinate.width) {
                    this.#block.moveRight(step);
                }
                break;

            // DOWN
            case 40:
                if (this.coordinate.top < this.#area.height - this.coordinate.height) {
                    this.#block.moveBottom(step);
                }
                break;

            // LEFT
            case 37:
                if (this.coordinate.left > 0) {
                    this.#block.moveLeft(step);
                }
                break;
        }
    }
}
