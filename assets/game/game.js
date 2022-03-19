import {Ai} from "./core/ai.js";
import {Helpers} from "./helpers/helpers.js";
import {Level} from "./model/level.js";

export class Game {
    #player;
    #area;
    #options;
    #scoreService;
    #overlayService;

    #levels = [];

    constructor(player, area, options, scoreService, overlayService) {
        this.#player = player;
        this.#area = area;
        this.#options = options;
        this.#scoreService = scoreService;
        this.#overlayService = overlayService;
    }

    nextLevel() {
        if (this.#levels.length <= 0) {
            this.#levels = this.#options.map((options, index) => {
                const coordinate = Helpers.buildPlayerCoordinate(this.#area);
                const ai = new Ai(this.#area, this.#player, coordinate, this.#buildOnStart, this.#buildOnStepOver, this.#buildOnLevelOver(index, this.#options.length), this.#buildOnGameOver);

                return new Level(ai, options);
            });
        }

        return this.#levels.shift();
    }

    #buildOnStart = () => {
        this.#scoreService.reset();
        this.#overlayService.hide();
    }

    #buildOnStepOver = () => {
        const bonus = this.#player.coordinate.left / 50;
        this.#scoreService.increase(bonus)
    };

    #buildOnLevelOver = (level, total) =>
        finalScore => {
            const over = this.#scoreService.score.current >= finalScore;
            if (!over) return over;

            if (++level <= total - 1) {
                this.#overlayService.levelOver(this.#scoreService.score, level);
                this.#scoreService.reset();
            } else {
                this.#overlayService.congratulations(this.#scoreService.score);
                this.#scoreService.clear();
            }

            return over;
        }

    #buildOnGameOver = () => {
        this.#overlayService.gameOver(this.#scoreService.score);
        this.#scoreService.clear();
        this.#levels = [];
    }
}
