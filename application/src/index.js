//import { Base } from './pages/base/base.jsx';

require('bootstrap-loader');
var angular = require('angular');

var ngModule = angular.module('app', [require('angular-route')]);

ngModule.config(['$locationProvider', '$routeProvider', 
    ($locationProvider, $routeProvider) => {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/shower', {
            controller: 'articleShowerCtrl', 
            template : '<article-shower></article-shower>'})
        .when('/editor', {
            controller: 'articleEditorCtrl', 
            template : '<article-editor></article-editor>'})
        .otherwise({ redirectTo: '/' });
}]);

require('./directives')(ngModule);
require('./controllers')(ngModule);


