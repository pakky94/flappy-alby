export class RankingService {
    #html;
    #http;
    #url;

    constructor(html, http, url) {
        this.#html = html;
        this.#http = http;
        this.#url = url;
    }

    show() {
        this.#http.get(this.#url, this.#print);
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