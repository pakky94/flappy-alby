import {Ai} from "./core/ai.js";
import {Player} from "./core/player.js";
import {BarrierSchema} from "./schemas/barrierSchema.js";

export class Game {
    #area;
    #player;
    #ai;

    #scoreService;
    #overlayService;
    #levelService;
    #livesService;
    #timerService;
    #speedService;

    constructor(area, scoreService, overlayService, levelService, livesService, timerService, speedService) {
        this.#area = area;

        this.#scoreService = scoreService;
        this.#overlayService = overlayService;
        this.#levelService = levelService;
        this.#livesService = livesService;
        this.#timerService = timerService;
        this.#speedService = speedService;
    }

    nextLevel() {
        if (this.#levelService.first && !this.#livesService.alive) {
            this.#livesService.recover();
        }

        const options = this.#levelService.currentOptions;
        this.#player = new Player(this.#area, options.coordinate, options.playerSteps);

        const schema = BarrierSchema.build;
        this.#ai = new Ai(this.#area, schema, this.#onStepOver);

        return () => {
            this.#scoreService.reset();
            this.#overlayService.hide();
            this.#levelService.update();
            this.#livesService.update();
            this.#speedService.update();
            this.#timerService.start();

            this.#ai.start(this.#player.coordinate, this.#levelService.currentOptions.steps);
        }
    }

    #onStepOver = elapsed => {
        if (this.#onGameOver()) return false;
        if (this.#onLevelOver(elapsed)) return false;

        const speed = this.#speedService.speed(this.#player.coordinate);
        this.#scoreService.calc(elapsed, this.#levelService.currentOptions.finalTime);
        return true;
    }

    #onLevelOver(elapsed) {
        // LEVEL Status Table               | levelOver | final |
        // Next level  (NEXT Level)         | 1         | 0     |
        // Game Over   (you WIN)            | 1         | 1     |
        const levelOver = elapsed >= this.#levelService.currentOptions.finalTime;
        if (levelOver) {
            this.#stop();

            const final = this.#levelService.final;
            if (final) {
                // FINAL LEVEL COMPLETE, YOU WIN (you WIN) => levelIndex > totalLevels
                this.#overlayService.youWin(this.#timerService.time);
                this.#levelService.reset();
                this.#livesService.kill();
            } else {
                // SOME REMAINING LEVELS (NEXT Level) => levelIndex <= totalLevels
                this.#overlayService.levelOver(this.#timerService.time, this.#levelService.level);
                this.#levelService.increase();
            }
        }

        return levelOver;
    }

    #onGameOver() {
        // GAME Status Table                | crashed   | alive |
        // Game Over   (you LOOSE)          | 1         | 0     |
        // Kill        (CONTINUE)           | 1         | 1     |
        const crashed = this.#ai.crash(this.#player.coordinate);
        if (crashed) {
            this.#stop();

            this.#livesService.decrease();
            this.#livesService.update();

            const alive = this.#livesService.alive;
            if (alive) {
                // USE REMAINING LIVES (CONTINUE) => players.count > 0
                this.#overlayService.continue(this.#timerService.time);
            } else {
                // Game Over   (you LOOSE)  =>  players.count <= 0
                this.#overlayService.gameOver(this.#timerService.time);
                this.#levelService.reset();
            }
        }

        return crashed;
    }

    #stop() {
        this.#ai.stop();
        this.#timerService.stop();
        this.#speedService.stop();
        this.#scoreService.complete();

        this.#player.dispose();
        this.#player = undefined;
    }
}
