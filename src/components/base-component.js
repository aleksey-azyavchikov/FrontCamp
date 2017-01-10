import { Storage }  from './storage';
import { ValidationFactory }  from './validation';
import { Constants }  from './consts';

export class BaseComponent {
    constructor(config) {
        if (this.initialize === undefined ||
            this.bindHandlers === undefined)
        throw new TypeError("Derived class doesn't implemented one of methods from class Page");
        this.storage = config && config.storage || new Storage(localStorage);
        this.validationFactory = config && config.validationFactory || new ValidationFactory();
        this.key = config && config.key || Constants.key;
        this.content = config && config.content || "";
    }

    get errorDiv() {
        return $('.error');
    }
    get errorSpan() {
        return $('span');
    }

    build(selector) {
        this.loadContent(this.content, () => {
            this.initialize();
            this.bindHandlers();
        }, selector);
    }

    loadContent(htmlPath, handler, selector) {
        if (selector === null || selector === undefined) {
            selector = "content";
        }
        $(selector).load(htmlPath, handler);
    }

    initialize() {
        // override
    }

    bindHandlers() {
        // override
    }

    showErrorMessage(error) {
        setTimeout(() => {
            this.errorSpan.text(error);
            this.errorDiv.show();
        }, 500);
    }

    hideErrorMessage() {
        setTimeout(() => {
            this.errorSpan.text("");
            this.errorDiv.hide("");
        }, 500);
    }
}