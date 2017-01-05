import { BaseComponent } from '../../../components/base-component';

import { Router } from '../../../components/router';

import './navigator.scss';

export default class Navigator extends BaseComponent {
    /** config { key, content } */
    constructor(config) {
        super(config);
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
            Router.loadComponent(target.text(), { selector: 'page' });
        })
    }
}