export class OverlayService {
    #html;
    #htmlTitle
    #htmlScore;
    #htmlLeaderboard;
    #htmlButton;

    constructor(html, htmlTitle, htmlScore, htmlLeaderboard, htmlButton) {
        this.#html = html;
        this.#htmlTitle = htmlTitle;
        this.#htmlScore = htmlScore;
        this.#htmlLeaderboard = htmlLeaderboard;
        this.#htmlButton = htmlButton;
    }

    static #timesBuilder(stopwatch) {
        return `<p>Completed In: ${stopwatch.final.getMinutes().round2()}:${stopwatch.final.getSeconds().round2()}:${stopwatch.final.getMilliseconds().round2()}</p>
                <p>Total Time: ${stopwatch.total.getMinutes().round2()}:${stopwatch.total.getSeconds().round2()}:${stopwatch.total.getMilliseconds().round2()}</p>`;
    }

    hide() {
        this.#html.style.display = 'none';
    }

    continue(stopwatch) {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = 'Continue ...';
        this.#htmlScore.innerHTML = OverlayService.#timesBuilder(stopwatch);
        this.#htmlLeaderboard.style.display = 'none';
        this.#htmlButton.innerHTML = 'Continue';
    }

    levelOver(stopwatch, level = "") {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = `Level <span class="level">${level}</span> Over!`;
        this.#htmlScore.innerHTML = OverlayService.#timesBuilder(stopwatch);
        this.#htmlLeaderboard.style.display = 'none';
        this.#htmlButton.innerHTML = 'Next Level';
    }

    youWin(stopwatch) {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = 'You Win!';
        this.#htmlScore.innerHTML = OverlayService.#timesBuilder(stopwatch);
        this.#htmlButton.innerHTML = 'Play Again';
    }

    gameOver(stopwatch) {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = 'Game Over!';
        this.#htmlScore.innerHTML = OverlayService.#timesBuilder(stopwatch);
        this.#htmlButton.innerHTML = 'Retry';
    }

    displayLeaderboard = (response) => {
        this.#htmlLeaderboard.style.display = 'block';

        let html = '<ol>';
        for (const player of JSON.parse(response)) {
            html += `<li>${player.name} - ${player.total}</li>`;
        }
        html += '</ol>';

        this.#htmlLeaderboard.innerHTML = html;
    }
}
