export class OverlayService {
    #html;
    #htmlTitle
    #htmlScore;
    #htmlButton;

    constructor(html, htmlTitle, htmlScore, htmlButton) {
        this.#html = html;
        this.#htmlTitle = htmlTitle;
        this.#htmlScore = htmlScore;
        this.#htmlButton = htmlButton;
    }

    static #scoreBuilder(time) {
        return `<p>Completed In: ${time.partial}</p>
                <p>Total Time: ${time.total}</p>`;
    }

    hide() {
        this.#html.style.display = 'none';
    }

    continue(time) {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = 'Continue ...';
        this.#htmlScore.innerHTML = OverlayService.#scoreBuilder(time);
        this.#htmlButton.innerHTML = 'Continue';
    }

    levelOver(time, level = "") {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = `Level <span class="level">${level}</span> Over!`;
        this.#htmlScore.innerHTML = OverlayService.#scoreBuilder(time);
        this.#htmlButton.innerHTML = 'Next Level';
    }

    youWin(time) {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = 'You Win!';
        this.#htmlScore.innerHTML = OverlayService.#scoreBuilder(time);
        this.#htmlButton.innerHTML = 'Play Again';
    }

    gameOver(score) {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = 'Game Over!';
        this.#htmlScore.innerHTML = OverlayService.#scoreBuilder(score);
        this.#htmlButton.innerHTML = 'Retry';
    }
}