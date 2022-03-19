export class LevelOption {
    #speed;
    #step;
    #playerStep;
    #finalScore;

    constructor(speed = 5, step = 1, playerStep = 5, finalScore = 1000) {
        this.#speed = speed;
        this.#step = step;
        this.#playerStep = playerStep;
        this.#finalScore = finalScore;
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

    get finalScore() {
        return this.#finalScore;
    }
}