//import { Base } from './pages/base/base.jsx';

require('bootstrap-loader');
var angular = require('angular');

var ngModule = angular.module('app', [require('angular-route')]);

ngModule.config(['$locationProvider', '$routeProvider', 
    ($locationProvider, $routeProvider) => {
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/articles', {
            template : '<article-shower></article-shower>'})
        .when('/article/add', {
            template : '<article-editor></article-editor>'})
        .when('/article/:id/edit', {
            template : '<article-editor></article-editor>'})
        .otherwise({ redirectTo: '/articles' });
}]);

require('./directives')(ngModule);
require('./controllers')(ngModule);


