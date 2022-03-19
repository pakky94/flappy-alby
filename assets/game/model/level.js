export class Level {
    #ai;
    #options;

    constructor(ai, options) {
        this.#ai = ai;
        this.#options = options;
    }

    start() {
        this.#ai.start(this.#options);
    }
}
