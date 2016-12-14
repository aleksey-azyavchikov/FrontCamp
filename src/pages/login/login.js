import { Page } from '../../components/page';
import { ValidationFactory, ValidatonConditions } from '../../components/validation';
import { Router } from '../../components/router';

import './login.scss';

export default class Login extends Page {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    get apiKey() {
        return $("input").val();
    }

    buildPage(selector) {
        super.loadContent(this.content, () => {
            this.initialize();
            this.bindHandlers();
        }, selector);
    }

    initialize() {
        console.log("Initilize Login Page");
        this.hideErrorMessage();
    }

    bindHandlers() {
        $("button").click($.proxy(this.storeApiKey, this))
    }

    storeApiKey(event) {
        let validator = this.validationFactory.getProxy(ValidatonConditions.apiKeyField);
        let object = this.checkValue(validator, this.apiKey);
        if (object.passed) {
            this.storage.setItem(this.key, this.apiKey);
            Router.loadPage("Home");
            return;
        }
        else {
            this.showErrorMessage(object.message);
        }
    }

    checkValue(validator, value) {
        try {
            validator.value = value;
        } catch (error) {
            return { passed: false, message: error }
        }
        return { passed: true, message: "" }
    }
}