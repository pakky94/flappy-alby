import {Area} from "./model/area.js";
import {Player} from "./core/player.js";
import {Helpers} from "./helpers/helpers.js";
import {ScoreService} from "./services/scoreService.js";
import {OverlayService} from "./services/overlayService.js";
import {LevelOption} from "./model/level-options.js";
import {Game} from "./game.js";

(function () {
    const levels = [
        new LevelOption(5, 1, 5, 10000),
        new LevelOption(5, 1.5, 5, 12500),
        new LevelOption(5, 2, 5, 15000),
        new LevelOption(5, 2.5, 5, 17500),
        new LevelOption(5, 3, 5, 20000)
    ];

    document.addEventListener('DOMContentLoaded', () => {
        const html_area = document.getElementById('area');
        const html_score = document.getElementById('score');
        const html_overlay = document.getElementById('overlay');
        const html_overlay_title = document.getElementById('overlay-title');
        const html_overlay_score = document.getElementById('overlay-score');
        const html_start_button = document.getElementById('start-button');

        const area = new Area(html_area);
        const player = new Player(area, Helpers.buildPlayerCoordinate(area));

        const scoreService = new ScoreService(html_score)
        const overlayService = new OverlayService(html_overlay, html_overlay_title, html_overlay_score, html_start_button);

        const game = new Game(player, area, levels, scoreService, overlayService);
        html_start_button.onclick = () => game.nextLevel().start();
    });
})();
