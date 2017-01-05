import { Constants }  from './consts';

export class Router {

    static loadComponent(name, config) {
        if (config === undefined || config === null) {
            config = {};
        }
        switch (name) {
            case Constants.pages.home.name: {
                Router.buildComponent($.extend(config, Router.buildDefaultConfig(name)));
                break;
            }
            case Constants.pages.news.name: {
                Router.buildComponent($.extend(config, Router.buildDefaultConfig(name)));
                break;
            }
            case Constants.pages.archive.name: {
                Router.buildComponent($.extend(config, Router.buildDefaultConfig(name)));
                break;
            }
            case Constants.pages.login.name: {
                Router.buildComponent($.extend(config, Router.buildDefaultConfig(name)));
                break;
            }
            case Constants.pages.navigator.name: {
                Router.buildComponent($.extend(config, Router.buildDefaultConfig(name)));
                break;
            }
            case Constants.pages.students.name: {
                Router.buildComponent($.extend(config, Router.buildDefaultConfig(name)));
                break;
            }
            case Constants.pages.editor.name: {
                Router.buildComponent($.extend(config, Router.buildDefaultConfig(name)));
                break;
            };
            default: break;
        }
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