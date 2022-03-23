export class StatisticsService {
    #areaCoordinate;
    #html_speed;
    #html_percentage;

    #percentage = 0;
    #speed = 0;

    constructor(area, speed, percentage) {
        this.#areaCoordinate = area;

        this.#html_speed = speed;
        this.#html_percentage = percentage;
    }

    get percentage() {
        return Math.trunc(this.#percentage);
    }

    get bonus() {
        return (this.#speed - 1) * 10;
    }

    start() {
        this.#percentage = 0;
        this.#update();
    }

    stop() {
        this.#speed = 0;
        this.#percentage = this.percentage >= 100 ? 100 : this.percentage + 1;
        this.#update();
    }

    reload(player, stopwatch) {
        this.#percentage = stopwatch.current / stopwatch.final * 100;

        if (player.left < Math.floor(this.#areaCoordinate.width / 3)) {
            this.#speed = 1;
        } else if (player.left < Math.floor(this.#areaCoordinate.width / 3) * 2) {
            this.#speed = 2;
        } else {
            this.#speed = 3;
        }

        this.#update();
    }

    #update() {
        this.#html_speed.innerHTML = `${this.#speed} m/s`;
        this.#html_percentage.innerText = `${this.percentage}%`;
    }
}