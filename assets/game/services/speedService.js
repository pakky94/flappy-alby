export class SpeedService {
    #area;
    #html;

    #speed = 0;

    constructor(area, html) {
        this.#area = area;
        this.#html = html;
    }

    stop() {
        this.#speed = 0;
        this.update();
    }

    speed(player) {
        if (player.left < Math.floor(this.#area.width / 3)) {
            this.#speed = 1;
        } else if (player.left < Math.floor(this.#area.width / 3) * 2) {
            this.#speed = 2;
        } else {
            this.#speed = 3;
        }

        this.update();
        return this.#speed;
    }

    update() {
        this.#html.innerHTML = `${this.#speed} m/s`;
    }
}