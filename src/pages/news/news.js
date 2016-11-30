import { Page } from '../../components/page';
import { ApiInvoker } from '../../components/api';
import { Router } from '../../components/router';

import './news.css';
//require('./news.html');

export default class NewsPage extends Page {
    /** config { key, content } */
    constructor(config) {
        super(config);
        this.key = config && config.key || "";
        this.content = config && config.content || "";
        this.apiInvoker = null;
    }

    get ul() {
        return $("ul");
    }

    buildPage() {
        super.loadContent(this.content, () => {
            this.initialize();
            this.bindHandlers();
        });
    }

    initialize() {
        console.log("Initilize News Page");
        this.hideErrorMessage();
    }

    bindHandlers() {
        $(".reset").click($.proxy(this.resetApiKey, this));
        $(".show").click($.proxy(this.downloadNews, this));
    }

    resetApiKey(event) {
        localStorage.removeItem(this.key);
        Router.loadPage("Home");
        return;
    }

    downloadNews() {
        require.ensure([], (require) => {
            this.ul.empty();
            this.ul.children().remove();
            let module = require('../../components/api');
            let apiInvoker = new module.ApiInvoker(this.storage.getItem(this.key));
            apiInvoker.getJson(
                (data) => {
                const template = `${data.articles.map(article => `
                <li>
                    <h4 class="header">${article.title}</h4>
                    <img class="image" src="${article.urlToImage}">
                    <div class="description">${article.description}</div>
                    <a class="source" href="${article.url}">Source</a>
                    <div class="author">${article.author}</div>
                    <div class="time">${article.publishedAt}</div>
                </li>
            `)}`;
                this.ul.append(template);
            },
                (error) => {
                    this.showErrorMessage(error);
                });
        });
    }
}