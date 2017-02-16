import { ApiInvoker } from '../components/api';
import { Constants } from '../components/consts';
import { Article } from '../models/article.model';

module.exports = function(ngModule) {
    ngModule.controller('articleEditorCtrl', function($scope, $routeParams) {
        let ctrl = this;
        let apiInvoker = ApiInvoker.getInstance();

        ctrl.article = new Article();

        ctrl.getArticleById = function(id) {
            apiInvoker.invoke(
                ApiInvoker(Constants.apiServer, Constants.apiEndPoints.get.news.articleById + id.toString()),
                { method: "GET", mode: "cors" },
                (data) => {
                    
                     ctrl.article = data.article
                     $scope.$apply();
                 },
                (error) => console.error(error)
            );
        }

        if($routeParams.articleId) {
            
        }
    });
}