import { BaseComponent } from '../../components/base-component';
import { ApiInvoker } from '../../components/api';
import { Router } from '../../components/router';

import './news.scss';
export default class NewsPage extends BaseComponent {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    get contentNews() {
        return $(".content-news");
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
        Router.loadComponent("Base", { selector: "base"});
        return;
    }

    downloadNews() {
        require.ensure([], (require) => {
            this.contentNews.empty();
            this.contentNews.children().remove();
            let module = require('../../components/api');
            let apiInvoker = new module.ApiInvoker(this.storage.getItem(this.key));
            apiInvoker.invoke(null, { method: "GET", mode: "cors" },
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