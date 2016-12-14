import { Page }         from '../../components/page';
import { ValidationFactory, ValidatonConditions } from '../../components/validation';
import { Router }       from '../../components/router';

import Navigator from '../../pages/partial/navigator/navigator';

import './home.scss';

export default class HomePage extends Page {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    buildPage(selector) {
        super.loadContent(this.content,() => {
            this.initialize();
            this.bindHandlers();
        }, selector);
    }

    initialize() {
        console.log("Initilize Home Page");
        Router.loadPage("Navigator", { selector: "navigator" });
        this.hideErrorMessage();
    }

    bindHandlers() {
    }
}