import { BaseComponent } from '../../components/base-component';

import { ValidationFactory, ValidatonConditions } from '../../components/validation';
import { Router }       from '../../components/router';

import Navigator from '../../pages/partial/navigator/navigator';

import './home.scss';

export default class HomePage extends BaseComponent {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    initialize() {
        console.log("Initilize Home Page");
        Router.loadComponent("Navigator", { selector: "navigator" });
        this.hideErrorMessage();
    }

    bindHandlers() {
    }
}