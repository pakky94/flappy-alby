export class Score {
    #current = 0;
    #final = 0;

    constructor(score = 0, final = score) {
        this.#current = score;
        this.#final = final;
    }

    get current() {
        return Math.floor(this.#current);
    }

    get final() {
        return Math.floor(this.#final);
    }

    increase(step = 1) {
        this.#current += step;
        this.#final += step;
    }

    reset(score = 0) {
        this.#current = score;
    }

    clear(score = 0, final = 0) {
        this.#current = score;
        this.#final = final;
    }
}