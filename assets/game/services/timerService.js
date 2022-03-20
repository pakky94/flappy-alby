import {Helpers} from "../helpers/helpers.js";

export class TimerService {
    #start;

    #partial;
    #total = 0;

    get time() {
        const partial = new Date(this.#partial);
        const partialMinutes = Helpers.round2(partial.getMinutes());
        const partialSeconds = Helpers.round2(partial.getSeconds());
        const partialMilliseconds = Helpers.round2(partial.getMilliseconds());

        const total = new Date(this.#total);
        const totalMinutes = Helpers.round2(total.getMinutes());
        const totalSeconds = Helpers.round2(total.getSeconds());
        const totalMilliseconds = Helpers.round2(total.getMilliseconds());

        return {
            partial: `${partialMinutes}:${partialSeconds}:${partialMilliseconds}`,
            total: `${totalMinutes}:${totalSeconds}:${totalMilliseconds}`
        };
    }

    start() {
        this.#start = new Date;
    }

    stop() {
        // milliseconds
        this.#partial = Math.abs(new Date - this.#start);
        this.#total += this.#partial;
    }
}