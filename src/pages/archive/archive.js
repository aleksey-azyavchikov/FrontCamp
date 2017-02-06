import { BaseComponent } from '../../components/base-component';
import { Constants } from '../../components/consts';
import { ApiInvoker } from '../../components/api';
import { Router } from '../../components/router';

import './archive.scss';

export default class ArchivePage extends BaseComponent {
    constructor(config) {
        super(config);
    }

    get contentArchive() {
        return $(".content-archive");
    }
    
    initialize() {
        console.log("Initilize Arhive Page");
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
            this.contentArchive.empty();
            this.contentArchive.children().remove();
            let module = require('../../components/api');
            let apiInvoker = new module.ApiInvoker(this.storage.getItem(this.key));
            apiInvoker.invoke(ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.get.news), { method: "GET", mode: "cors" },
                (data) => {
                    const template = `${data.map(article => `
                        <div class="panel panel-default archive-panel">
                            <div class="panel-heading">
                                <h3 class="panel-title">${article.title}</h3>
                            </div>
                            <div class="panel-body">
                                <img class="archive-image" src="${article.urlToImage === "" 
                                    ? "../../../resources/images/default-thumbnail.jpg" 
                                    : article.urlToImage 
                                }">
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