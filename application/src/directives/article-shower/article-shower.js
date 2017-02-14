import { ApiInvoker } from '../../components/api';
import { Constants } from '../../components/consts';

require('../../common-css/common.scss');
require('./article-shower.scss');

module.exports = function(ngModule) {
    ngModule.directive('articleShower', articleShowerFn);

    function articleShowerFn() {
        return  {
            restrict: 'E',
            scope: {},
            template: require('./article-shower.html'),
            controller: 'articleShowerCtrl'
        }
    }
}