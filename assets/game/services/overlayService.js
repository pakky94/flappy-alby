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

    static #scoreBuilder(score) {
        return `<p>Level Score: ${score.current}</p>
                <p>Final Score: ${score.final}</p>`;
    }

    levelOver(score, level = "") {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = `Level <span class="level">${level}</span> Over!`;
        this.#htmlScore.innerHTML = OverlayService.#scoreBuilder(score);
        this.#htmlButton.innerHTML = 'Next Level';
    }

    gameOver(score) {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = 'Game Over!';
        this.#htmlScore.innerHTML = OverlayService.#scoreBuilder(score);
        this.#htmlButton.innerHTML = 'Retry';
    }

    congratulations(score) {
        this.#html.style.display = 'block';
        this.#htmlTitle.innerHTML = 'Final Level Completed!';
        this.#htmlScore.innerHTML = OverlayService.#scoreBuilder(score);
        this.#htmlButton.innerHTML = 'Restart';
    }

    hide() {
        this.#html.style.display = 'none';
    }
}