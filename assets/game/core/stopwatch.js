export class Stopwatch {
    #start = 0;
    #final = 10000;

    #total = 0;

    get current() {
        return new Date(Date.now() - this.#start);
    }

    get final() {
        return new Date(this.#final);
    }

    get total() {
        return new Date(this.#total);
    }

    get formattedTotal() {
        let t = this.total;
        return `${ (t.getHours()-1).round2() }:${ t.getMinutes().round2() }:${ t.getSeconds().round2() }.${ t.getMilliseconds().round2() }`
    }

    get over() {
        return this.#final - this.current < 0;
    }

    start(final) {
        this.#start = Date.now();
        this.#final = final;
    }

    stop() {
        this.#total += this.#final;
    }

    applyBonus(value) {
        this.#final -= value;
    }
}