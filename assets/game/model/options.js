export class Option {
    #speed;
    #step;
    #playerStep;
    #finalScore;
    #coordinate;

    constructor(coordinate, speed = 5, step = 1, playerStep = 5, finalScore = 1000) {
        this.#speed = speed;
        this.#step = step;
        this.#playerStep = playerStep;
        this.#finalScore = finalScore;
        this.#coordinate = coordinate;
    }

    get speed() {
        return this.#speed;
    }

    get steps() {
        return this.#step;
    }

    get playerSteps() {
        return this.#playerStep;
    }

    get finalTime() {
        return this.#finalScore;
    }

    get coordinate() {
        return this.#coordinate.clone();
    }
}