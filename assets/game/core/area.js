import {Helpers} from '../helpers/helpers.js';
import {Coordinate} from "../model/coordinate.js";
import {Block} from "./block.js";

export class Area {
    #html;
    #coordinate;

    constructor(html, coordinate) {
        this.#html = html;
        this.#coordinate = coordinate;
    }

    get coordinate() {
        return this.#coordinate;
    }

    add(coordinate, id = Helpers.uuidv4()) {
        let block = document.createElement('div');

        block.classList.add('block');
        block.id = id;

        if (!coordinate instanceof Coordinate) {
            throw new Error('Invalid coordinate!');
        }

        block.style.top = `${coordinate.top}px`;
        block.style.left = `${coordinate.left}px`;
        block.style.width = `${coordinate.width}px`;
        block.style.height = `${coordinate.height}px`;

        this.#html.appendChild(block);

        return new Block(block, coordinate, this.#coordinate);
    }

    remove(blocks) {

        if (blocks instanceof Block) {
            this.#html.removeChild(blocks.html);
            return;
        }

        if (blocks instanceof Array) {
            for (let block of blocks) {
                this.#html.removeChild(block.html);
            }
            return;
        }

        throw new Error('Invalid argument');
    }
}