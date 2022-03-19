import {Coordinate} from "../model/coordinate.js";
import {Helpers} from "../helpers/helpers.js";
import {LevelOption} from "../model/level-options.js";

export class Ai {
    #area;
    #player;
    #coordinate;
    #onStart;
    #onStepOver;
    #onLevelOver;
    #onGameOver;

    #timer;
    #blocks = [];

    constructor(area, player, coordinate, onStart, onStepOver, onLevelOver, onGameOver) {
        this.#area = area;
        this.#player = player;
        this.#coordinate = coordinate;
        this.#onStart = onStart;
        this.#onStepOver = onStepOver;
        this.#onLevelOver = onLevelOver;
        this.#onGameOver = onGameOver;
    }

    start(options) {
        this.#onStart();
        this.#player.start(this.#coordinate, options.playerSteps);
        this.#build(this.#coordinate);
        this.#animate(this.#coordinate, options);
    }

    stop() {
        clearInterval(this.#timer);
        this.#player.stop()
        // TODO: START recursive remove
        this.#area.remove(this.#blocks);
        this.#blocks = [];
        // TODO: END recursive remove
    }

    #animate(coordinate, options = new LevelOption()) {
        this.#timer = setInterval(e => {
            if (this.#blocks.length <= 0) return;

            for (let block of this.#blocks) {
                block.moveLeft(options.steps);

                if (block.crash(coordinate)) {
                    this.stop();
                    this.#onGameOver();
                    return;
                }
            }

            if (this.#blocks[0].coordinate.left + this.#blocks[0].coordinate.width <= 0) {
                this.#area.remove(this.#blocks.shift());
                this.#area.remove(this.#blocks.shift());
            }

            const limit = Math.floor(this.#area.coordinate.width * .66);
            const left = this.#blocks[this.#blocks.length - 1].coordinate.left;
            if (left <= limit || limit >= left) {
                this.#build(coordinate);
            }

            const over = this.#onLevelOver(options.finalScore);
            if (over) {
                this.stop();
                return;
            }

            this.#onStepOver();
        }, options.speed);
    }

    #build(coordinate) {

        let heightTop = Helpers.getRandom(0, this.#area.coordinate.height * .6);
        let fissure = Helpers.getRandom(coordinate.height * 1.5, coordinate.height * 3);
        let heightBottom = this.#area.coordinate.height - heightTop - fissure;

        let width = Helpers.getRandom(coordinate.width, coordinate.width * 2);

        let top = new Coordinate(0, this.#area.coordinate.width + width, heightTop, width);
        let bottom = new Coordinate(heightTop + fissure, this.#area.coordinate.width + width, heightBottom, width)

        this.#blocks.push(this.#area.add(top));
        this.#blocks.push(this.#area.add(bottom));
    }
}
