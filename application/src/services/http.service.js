import { ApiInvoker } from '../components/api';
import { Constants } from '../components/consts';

module.exports = function (ngModule) {
    ngModule.factory('httpService', function () {
        let apiInvoker = ApiInvoker.getInstance();
        return {
            apiInvoker: apiInvoker,
            getArticles: function (success) {
                this.apiInvoker.invoke(
                    ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.get.news.articles),
                    { method: "GET", mode: "cors" },
                    (data) => {
                        success(data);
                    },
                    (error) => console.error(error)
                );
            },
            deleteArticle: function (id, success) {
                if (!confirm("Are you sure?")) return;
                apiInvoker.invoke(
                    ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.delete.news.article),
                    { method: "DELETE", headers: { "Content-Type": "application/json" }, mode: "cors", body: JSON.stringify({ id: id }) },
                    (data) => {
                        success(data);
                    },
                    (error) => console.error(error)
                );
            }
        }
    });
}