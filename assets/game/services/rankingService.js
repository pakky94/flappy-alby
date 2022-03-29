export class RankingService {
    #html;
    #http;
    #url;

    constructor(html, http, url) {
        this.#html = html;
        this.#http = http;
        this.#url = url;
    }

    show(callback) {
        this.#http.get(this.#url, callback);
    }

    sendScore(name, stopwatch, callback) {
        let total = stopwatch.formattedTotal;
        this.#http.post(this.#url, JSON.stringify({Name: name, Total: total}), callback);
    }

    hide() {
        this.#html.innerHTML = '';
    }

    #print = response => {
        let html = '<ol>';
        for (const player of JSON.parse(response)) {
            html += `<li>${player.name} - ${player.total}</li>`;
        }
        html += '</ol>';

        document.getElementById('ranking').innerHTML = html;
    }
}
