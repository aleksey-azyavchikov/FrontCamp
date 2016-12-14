import { Page } from '../../components/page';
import { ApiInvoker } from '../../components/api';
import { Router } from '../../components/router';
import Navigator from '../../components/router';

import './news.scss';

export default class NewsPage extends Page {
    /** config { key, content } */
    constructor(config) {
        super(config);
        this.apiInvoker = null;
    }

    get contentNews() {
        return $(".content-news");
    }

    buildPage(selector) {
        super.loadContent(this.content, () => {
            this.initialize();
            this.bindHandlers();
        }, selector);
    }

    initialize() {
        console.log("Initilize News Page");
        this.hideErrorMessage();
    }

    bindHandlers() {
        $("button:contains('Reset Api Key')").click($.proxy(this.resetApiKey, this));
        $("button:contains('Show News')").click($.proxy(this.downloadNews, this));
    }

    resetApiKey(event) {
        localStorage.removeItem(this.key);
        Router.loadPage("Login");
        return;
    }

    downloadNews() {
        require.ensure([], (require) => {
            this.contentNews.empty();
            this.contentNews.children().remove();
            let module = require('../../components/api');
            let apiInvoker = new module.ApiInvoker(this.storage.getItem(this.key));
            apiInvoker.getJson(null, { method: "GET", mode: "cors" },
                (data) => {
                const template = `${data.articles.map(article => `
                    <div class="panel panel-default news-panel">
                        <div class="panel-heading">
                            <h3 class="panel-title">${article.title}</h3>
                        </div>
                        <div class="panel-body">
                            <img class="news-image" src="${article.urlToImage}">
                            <div>${article.description}</div>
                            <a href="${article.url}">Source</a>
                            <div>${article.author}</div>
                            <div>${article.publishedAt}</div>
                        </div>
                    </div>
                `)}`;
                this.contentNews.append(template);
            },
                (error) => {
                    this.showErrorMessage(error);
                });
        });
    }
}