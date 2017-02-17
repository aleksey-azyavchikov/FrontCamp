import 'angular';
import 'angular-mocks/angular-mocks';

var testContext = require.context("../src", true, /\.spec\.js$/);
testContext.keys().forEach(testContext); 