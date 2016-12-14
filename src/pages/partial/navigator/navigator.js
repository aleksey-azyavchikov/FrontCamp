import { Page } from '../../../components/page';
import { Router } from '../../../components/router';

import './navigator.scss';

export default class Navigator extends Page {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    buildPage(selector) {
        super.loadContent(this.content, () => {
            this.initialize();
            this.bindHandlers();
        }, selector);
    }

    initialize() {
        console.log("Initilize Navigator Page");
    }

    bindHandlers() {
        let selector = "ul";
        $(selector).children().on('click', (event) => {
            $(selector).children().removeClass('active')
            let target = $(event.target); 
            target.parent().addClass('active')
            Router.loadPage(target.text(), { selector: 'page' });
        })
    }
}