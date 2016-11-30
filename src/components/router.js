import { Constants } from './consts';
import { ValidationFactory } from './validation';
import { Storage } from './storage';

export class Router {

    static get newsDefaultConfig() {
        return {
            name: "News",
            content: './pages/news/news.html',
            module: '/news/news'
        };
    }

    static get homeDefaultConfig() {
        return {
            name: "Home",
            content: '../pages/home/home.html',
            module: '/home/home'
        };
    }

    static loadPage(name, config) {
        if (config === undefined || config === null) {
            config = {};
        }
        switch (name) {
            case Router.homeDefaultConfig.name: {
                Router.buildPage($.extend(config, Router.homeDefaultConfig));
                break;
            }
            case Router.newsDefaultConfig.name: {
                Router.buildPage($.extend(config, Router.newsDefaultConfig));
                break;
            }
            default: break;
        }
    }

    static buildPage(config) {
        let page = require('bundle!../pages' + config.module)(function(page) {
            new page.default({
                key: config && config.key || Constants.key,
                storage: config && config.storage || new Storage(localStorage),
                content: config && config.content || "", //error potencial
                validationFactory: config && config.validation || new ValidationFactory(),
                module: config && config.module || "", //error potencial
            }).buildPage();
        });
    }
}