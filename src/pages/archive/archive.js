import { Page } from '../../components/page';
import { Constants } from '../../components/consts';
import { ApiInvoker } from '../../components/api';
import { Router } from '../../components/router';

import './archive.scss';

export default class ArchivePage extends Page {
    constructor(config) {
        super(config);
        this.key = config && config.key || "";
        this.content = config && config.content || "";
        this.apiInvoker = null;
    }

    get contentArchive() {
        return $(".content-archive");
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
        $(".reset").click($.proxy(this.resetApiKey, this));
        $(".show").click($.proxy(this.downloadNews, this));
    }

    resetApiKey(event) {
        localStorage.removeItem(this.key);
        Router.loadPage("Login");
        return;
    }

    downloadNews() {
        require.ensure([], (require) => {
            this.contentArchive.empty();
            this.contentArchive.children().remove();
            let module = require('../../components/api');
            let apiInvoker = new module.ApiInvoker(this.storage.getItem(this.key));
            apiInvoker.getJson("http://localhost:3001/news", { method: "GET", mode: "cors" },
                (data) => {
                    const template = `${data.map(article => `
                        <div class="panel panel-default archive-panel">
                            <div class="panel-heading">
                                <h3 class="panel-title">${article.title}</h3>
                            </div>
                            <div class="panel-body">
                                <img class="archive-image" src="${article.urlToImage}">
                                <div>${article.description}</div>
                                <a href="${article.url}">Source</a>
                                <div>${article.author}</div>
                                <div>${article.publishedAt}</div>
                            </div>
                        </div>
                    `)}`;
                    this.contentArchive.append(template);
                },
                (error) => {
                    console.log(error);
                    this.showErrorMessage(error);
                });
        });
    }
}