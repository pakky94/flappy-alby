export class ScoreService {
    #html;
    #percentage = 0;

    constructor(html) {
        this.#html = html;
    }

    get percentage() {
        return Math.trunc(this.#percentage);
    };

    reset() {
        this.#percentage = 0;
        this.#update();
    }

    calc(current, final) {
        this.#percentage = current / final * 100;
        this.#update();
    }

    complete() {
        this.#percentage++;
        this.#update();
    }


    #update() {
        this.#html.innerText = `${this.percentage}%`;
    }
}
