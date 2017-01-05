import { BaseComponent } from '../../components/base-component';

import { ValidationFactory, ValidatonConditions } from '../../components/validation';
import { Router } from '../../components/router';

import './login.scss';

export default class Login extends BaseComponent {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    get apiKey() {
        return $("input").val();
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
            Router.loadComponent("Home");
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