import { ApiInvoker } from '../components/api';
import { Constants } from '../components/consts';

module.exports = function(ngModule) { 
    ngModule.controller('articleShowerCtrl',  function($scope) {
        const ctrl = this;
        let apiInvoker = ApiInvoker.getInstance();

        console.log("reree");

        let getToLocalServerUrl = function (endpoint) {
            let url = ApiInvoker.buildUrl(
                Constants.apiServer, 
                endpoint);
            return url;
        }

        ctrl.getArticles = function() {
            console.log("Scope", ctrl);
            apiInvoker.invoke(
                getToLocalServerUrl(Constants.apiEndPoints.get.news),
                { method: "GET", mode: "cors" },
                (data) => $scope.$apply(() =>  {
                     ctrl.articles = data.articles
                 }),
                (error) => console.error
            );
        }
        
        ctrl.click = function(v) {
            console.log(v);
        }
        ctrl.fuck = "Fuck";
        ctrl.ol = [1,2,3];

        ctrl.getArticles();
    });
}