import {Area} from "./core/area.js";
import {ScoreService} from "./services/scoreService.js";
import {OverlayService} from "./services/overlayService.js";
import {LevelService} from "./services/levelService.js";
import {Option} from "./model/options.js";
import {Game} from "./game.js";
import {Coordinate} from "./model/coordinate.js";
import {LivesService} from "./services/livesService.js";
import {TimerService} from "./services/timerService.js";
import {SpeedService} from "./services/speedService.js";

(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const html_area = document.getElementById('area');
        const html_score = document.getElementById('score');
        const html_overlay = document.getElementById('overlay');
        const html_overlay_title = document.getElementById('overlay-title');
        const html_overlay_score = document.getElementById('overlay-score');
        const html_start_button = document.getElementById('overlay-button');
        const html_level = document.getElementById('header-level');
        const html_lives = document.getElementById('lives');
        const html_speed = document.getElementById('speed');

        const areaCoordinate = new Coordinate(0, 0, html_area.clientHeight, html_area.clientWidth);
        const area = new Area(html_area, areaCoordinate);

        const levelsOptions = [];
        for (let i = 1; i < 6; i++) {
            const playerSide = areaCoordinate.width / 20;
            const playerCoordinate = new Coordinate((areaCoordinate.height - playerSide) / 2, areaCoordinate.width * .1, playerSide, playerSide);
            levelsOptions.push(new Option(playerCoordinate, 5, i, i > 2 ? 8 : 5, i * 3000));
        }

        const scoreService = new ScoreService(html_score);
        const overlayService = new OverlayService(html_overlay, html_overlay_title, html_overlay_score, html_start_button);
        const levelService = new LevelService(html_level, levelsOptions);
        const livesService = new LivesService(html_lives);
        const timerService = new TimerService();
        const speedService = new SpeedService(areaCoordinate, html_speed);

        const game = new Game(area, scoreService, overlayService, levelService, livesService, timerService, speedService);
        html_start_button.onclick = () => game.nextLevel()();
    });
})();
