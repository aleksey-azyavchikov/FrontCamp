import { BaseComponent }    from '../../components/base-component';
import { Router }           from '../../components/router';
import { Storage }          from '../../components/storage';
import { Constants }        from '../../components/consts';

import './base.scss';

export default class BasePage extends BaseComponent {
    constructor(config) {
        super(config);
    }

    initialize() {
        console.log("Initilize Base Page");
        Router.loadComponent("Brand", { selector: "brand" });
        Router.loadComponent("Footer", { selector: "footer" });

        let storage = new Storage(localStorage);
        storage.itemIsExist(Constants.key) 
            ? Router.loadComponent("Home") 
            : Router.loadComponent("Login");
    }

    bindHandlers() {}
}