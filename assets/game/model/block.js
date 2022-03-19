export class Block {
    #html;
    #coordinate;

    constructor(html, coordinate) {
        this.#html = html;
        this.#coordinate = coordinate;
    }

    get html() {
        return this.#html;
    }

    get coordinate() {
        return this.#coordinate;
    }

    crash(coordinate) {
        return coordinate.intersect(this.coordinate);
    }

    moveTop(step) {
        this.#coordinate.moveTop(step);
        this.#html.style.top = `${this.#coordinate.top}px`;
    }

    moveRight(step) {
        this.#coordinate.moveRight(step);
        this.#html.style.left = `${this.#coordinate.left}px`;
    }

    moveBottom(step) {
        this.#coordinate.moveBottom(step);
        this.#html.style.top = `${this.#coordinate.top}px`;
    }

    moveLeft(step) {
        this.#coordinate.moveLeft(step);
        this.#html.style.left = `${this.#coordinate.left}px`;
    }

    reset(coordinate) {
        this.#html.style.top = `${coordinate.top}px`;
        this.#html.style.left = `${coordinate.left}px`;

        this.#coordinate = coordinate;
    }
}
