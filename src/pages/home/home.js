import { Page }   from '../../components/page';
import { ValidationFactory, ValidatonConditions } from '../../components/validation';

export class HomePage extends Page {
    /** config { key, content } */
    constructor(config) {
        super(config);
        this.key     =  config && config.key     || "";
        this.content =  config && config.content || "";
    }

    get apiKey () {
        return $("input").val();
    }

    buildPage() {
        super.loadContent(this.content,() => {
            this.initialize();
            this.bindHandlers();
        });
    }

    initialize() {
        console.log("Initilize Home Page");
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
            location.reload();
            //window.location.href = '../news/news.html';
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
        return { passed: true, message: ""}
    }
}