import { Router } from './components/router';
import { Storage } from './components/storage';
import { Constants } from './components/consts';

import './index.scss';
require('bootstrap-loader');

$(document).ready(() => {
        Router.loadComponent("Base", { selector: "base" }) 
});
