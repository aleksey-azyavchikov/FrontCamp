import { ApiInvoker } from '../components/api';
import { Constants } from '../components/consts';

module.exports = function(ngModule) { 
    ngModule.controller('articleShowerCtrl', function($scope) {
        let apiInvoker = ApiInvoker.getInstance();

        let getToLocalServerUrl = function (endpoint) {
            let url = ApiInvoker.buildUrl(
                Constants.apiServer, 
                endpoint);
            return url;
        }

        $scope.articles = [];
        $scope.getArticles = function() {
            apiInvoker.invoke(
                getToLocalServerUrl(Constants.apiEndPoints.get.news),
                { method: "GET", mode: "cors" },
                (data) => { $scope.articles = data; $scope.tr = "rer" },
                (error) => console.error
            );
            return $scope.articles;
        }

        $scope.are = "Truly";
    });
}