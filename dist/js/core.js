"use strict";

var key = "BbcNews";

window.onload = function () {
    var apiKey = localStorage.getItem(key);
    var homePage = "home";
    var newsPage = "news";

    apiKey === null ? $("#content").load(getPage(homePage), loadHomePage) : $("#content").load(getPage(newsPage), loadNewsPage);
};

function getPage(page) {
    return "pages/" + page + ".html";
}

function loadHomePage() {
    var errorApi = $(".error-api");
    errorApi.hide();

    $("button").click(function () {
        var input = $("input");
        var spanError = $("span");
        var errorApi = $(".error-api");
        var validationFactory = new ValidationFactory();
        var proxy = validationFactory.getProxy(EnumFieldsValidators.ApiKeyField);

        try {
            var apiKey = input.val();
            proxy.value = apiKey;
        } catch (error) {
            setTimeout(function () {
                spanError.text(error);
                errorApi.show();
            }, 1000);
            return;
        }

        errorApi.hide();
        localStorage.setItem(key, proxy.value);
        input.val("");
        location.reload();
    });
}

function loadNewsPage() {
    var errorApi = $(".error-api");
    errorApi.hide();

    $("button").click(function () {
        localStorage.removeItem(key);
        location.reload();
        return;
    });

    var apiKey = localStorage.getItem(key);
    if (apiKey === null) {
        location.reload();
        return;
    }

    var apiInvoker = new ApiInvoker(apiKey);
    apiInvoker.getJson(function (data) {
        var ul = $("ul");
        var template = "" + data.articles.map(function (article) {
            return "\n            <li>\n                <h4 class=\"header\">" + article.title + "</h4>\n                <img class=\"image\" src=\"" + article.urlToImage + "\">\n                <div class=\"description\">" + article.description + "</div>\n                <a class=\"source\" href=\"" + article.url + "\">Source</a>\n                <div class=\"author\">" + article.author + "</div>\n                <div class=\"time\">" + article.publishedAt + "</div>\n            </li>\n        ";
        });
        ul.append(template);
    }, function (error) {
        var spanError = $("span");
        spanError.text("Error on server side");
        errorApi.show();
    });
}