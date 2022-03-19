import {Score} from "../model/scores.js";

export class ScoreService {
    #html;
    #score;

    constructor(html, score, total) {
        this.#html = html;
        this.#score = new Score(score, total);
    }

    get score() {
        return this.#score;
    };

    increase(step) {
        this.#score.increase(step);
        this.#print();
    }

    reset(score) {
        this.#score.reset(score);
        this.#print();
    }

    clear(score, total) {
        this.#score.clear(score, total)
        this.#print();
    }

    #print() {
        this.#html.innerText = this.#score.current;
    }
}
