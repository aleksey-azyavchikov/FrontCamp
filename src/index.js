import { Storage } from './components/storage';
import { Constants } from './components/consts';
import { Router } from './components/router';


import './index.css';
//require('./index.html');

$(document).ready(() => {
    let storage = new Storage(localStorage);
    let apiKey = storage.getItem(Constants.key);
    if (apiKey !== null) {
        Router.loadPage("News", { storage });
    } else {
        Router.loadPage("Home", { storage })
    }
});
