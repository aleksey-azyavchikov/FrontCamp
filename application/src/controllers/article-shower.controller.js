import { ApiInvoker } from '../components/api';
import { Constants } from '../components/consts';

module.exports = function(ngModule) { 
    ngModule.controller('articleShowerCtrl',  function($scope) {
        const ctrl = this;
        let apiInvoker = ApiInvoker.getInstance();

        let getToLocalServerUrl = function (endpoint) {
            let url = ApiInvoker.buildUrl(
                Constants.apiServer, 
                endpoint);
            return url;
        }

        ctrl.getArticles = function() {
            apiInvoker.invoke(
                getToLocalServerUrl(Constants.apiEndPoints.get.news.articles),
                { method: "GET", mode: "cors" },
                (data) => {
                     ctrl.articles = data.articles;
                     $scope.$apply();
                 },
                (error) => console.error(error)
            );
        }

        ctrl.deleteArticle = function(id) {
            if(!confirm("Are you sure?")) return;
            apiInvoker.invoke(
                getToLocalServerUrl(Constants.apiEndPoints.delete.news.article),
                { method: "DELETE", headers: { "Content-Type": "application/json" }, mode: "cors", body: JSON.stringify({id: id}) },
                (data) => {
                     ctrl.getArticles();
                 },
                (error) => console.error(error)
            );
        }

        ctrl.getArticles();
    });
}