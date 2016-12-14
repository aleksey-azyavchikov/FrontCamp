import { Router } from './components/router';
import { Storage } from './components/storage';
import { Constants } from './components/consts';

import './index.scss';
require('bootstrap-loader');

$(document).ready(() => {
    let storage = new Storage(localStorage);
    storage.itemIsExist(Constants.key) 
        ? Router.loadPage("Home") 
        : Router.loadPage("Login");
});
