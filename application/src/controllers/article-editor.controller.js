import { ApiInvoker } from '../components/api';
import { Constants } from '../components/consts';
import { Mapper } from '../components/mapper';
import { Article } from '../models/article.model';

module.exports = function(ngModule) {
    ngModule.controller('articleEditorCtrl', function($scope, $routeParams) {
        let ctrl = this;
        let apiInvoker = ApiInvoker.getInstance();

        ctrl.article = new Article();
        ctrl.article.urlToImage = "../../resources/images/default-thumbnail.jpg";

        ctrl.getArticleById = function (id) {
            apiInvoker.invoke(
                ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.get.news.articleById + id.toString()),
                { method: "GET", mode: "cors" },
                (data) => {
                    console.log(data);
                    Mapper.mapProperties(data.article, ctrl.article, (source, destination) => {
                        destination.image.data = source.image && source.image.data || null;
                        destination.image.contentType = source.image && source.image.contentType || "null";
                    });
                    $scope.$apply();
                },
                (error) => console.error(error)
            );
        };

        ctrl.updateArticle = function (article) {
            apiInvoker.invoke(
                Constants.apiServer + Constants.apiEndPoints.get.news.articleById + id.toString(),
                { method: "GET", mode: "cors" },
                (data) => {
                    console.log(data);
                    Mapper.mapProperties(data.article, ctrl.article, (source, destination) => {
                        destination.image.data = source.image && source.image.data || null;
                        destination.image.contentType = source.image && source.image.contentType || "null";
                    });
                    $scope.$apply();
                },
                (error) => console.error(error)
            );
        }

        ctrl.getImage = function() {
            return ctrl.article.image.data !== undefined && 
                   ctrl.article.image.data !== null &&
                   ctrl.article.image.data !== ""
                ? ctrl.article.image.data 
                : ctrl.article.urlToImage;
        }

        if($routeParams.articleId !== undefined &&
            $routeParams.articleId !== null) {
            ctrl.getArticleById($routeParams.articleId);
        }
    });
}