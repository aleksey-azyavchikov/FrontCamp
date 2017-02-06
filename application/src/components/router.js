import { Constants }  from './consts';

export class Router {

    static loadComponent(name, config) {
        if (config === undefined || config === null) {
            config = {};
        }
        Router.buildComponent($.extend(config, Router.buildDefaultConfig(name)));
    }

    static buildDefaultConfig(name) {
        return Constants.pages[name.toLowerCase()]
    }

    static buildComponent(config) {
        let page = require('bundle!../pages' + config.module)(function(page) {
            new page.default({
                key: config && config.key,
                storage: config && config.storage,
                content: config && config.content,
                validationFactory: config && config.validation,
                module: config && config.module,
            }).build(config.selector);
        });
    }
}