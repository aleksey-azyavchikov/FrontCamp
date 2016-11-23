"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiInvoker = function () {
    function ApiInvoker(apiKey) {
        _classCallCheck(this, ApiInvoker);

        this.apiKey = apiKey;
    }

    _createClass(ApiInvoker, [{
        key: "getJson",
        value: function getJson(succesHandler, errorHandler, endpointUrl) {
            var url = endpointUrl;
            if (url === undefined || url === null) {
                url = this.Url;
            }
            if (errorHandler === undefined || errorHandler === null) {
                errorHandler = function errorHandler(error) {
                    console.log("error");console.log(error);
                };
            }
            if (succesHandler === undefined || succesHandler === null) {
                succesHandler = function succesHandler(data) {
                    console.log("success");console.log(data);
                };
            }
            var request = new Request(url);
            var init = { method: "GET", mode: "cors" };

            fetch(request, init).then(function (response) {
                return response.json();
            }).then(function (data) {
                return succesHandler(data);
            }).catch(function (error) {
                return errorHandler(error);
            });
        }
    }, {
        key: "Url",
        get: function get() {
            return "https://newsapi.org/v1/articles?source=bbc-news&apiKey=" + this.apiKey;
        }
    }]);

    return ApiInvoker;
}();