import { Constants }  from './consts';

export class Router {
    static get homeDefaultConfig() {
        return {
            name: Constants.pages.home.name,
            content: Constants.pages.home.content,
            module: Constants.pages.home.module
        };
    }

    static get newsDefaultConfig() {
        return {
            name: Constants.pages.news.name,
            content: Constants.pages.news.content,
            module: Constants.pages.news.module
        };
    }

    static get archiveDefaultConfig() {
        return {
            name: Constants.pages.archive.name,
            content: Constants.pages.archive.content,
            module: Constants.pages.archive.module
        };
    }

    static get loginDefaultConfig() {
        return {
            name: Constants.pages.login.name,
            content: Constants.pages.login.content,
            module: Constants.pages.login.module
        };
    }

    static get navigatorDefaultConfig() {
        return {
            name: Constants.pages.navigator.name,
            content: Constants.pages.navigator.content,
            module: Constants.pages.navigator.module
        };
    }

    static get studentsDefaultConfig() {
        return {
            name: Constants.pages.students.name,
            content: Constants.pages.students.content,
            module: Constants.pages.students.module
        };
    }

    static loadPage(name, config) {
        if (config === undefined || config === null) {
            config = {};
        }
        switch (name) {
            case Constants.pages.home.name: {
                Router.buildPage($.extend(config, Router.homeDefaultConfig));
                break;
            }
            case Constants.pages.news.name: {
                Router.buildPage($.extend(config, Router.newsDefaultConfig));
                break;
            }
            case Constants.pages.archive.name: {
                Router.buildPage($.extend(config, Router.archiveDefaultConfig));
                break;
            }
            case Constants.pages.login.name: {
                Router.buildPage($.extend(config, Router.loginDefaultConfig));
                break;
            }
            case Constants.pages.navigator.name: {
                Router.buildPage($.extend(config, Router.navigatorDefaultConfig));
                break;
            }
            case Constants.pages.students.name: {
                Router.buildPage($.extend(config, Router.studentsDefaultConfig));
                break;
            };
            default: break;
        }
    }

    static loadComponent(name, config) {
        if (config === undefined || config === null) {
            config = {};
        }
        switch (name) {
            case Constants.pages.login.name: {
                Router.buildPage($.extend(config, Router.loginDefaultConfig));
                break;
            }
            default: break;
        }
    }

    static buildPage(config) {
        let page = require('bundle!../pages' + config.module)(function(page) {
            new page.default({
                key: config && config.key,
                storage: config && config.storage,
                content: config && config.content,
                validationFactory: config && config.validation,
                module: config && config.module,
            }).buildPage(config.selector);
        });
    }
}