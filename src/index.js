import { Router } from './components/router';

import './index.scss';
require('bootstrap-loader');

$(document).ready(() => {
    Router.loadPage("Home");
});
