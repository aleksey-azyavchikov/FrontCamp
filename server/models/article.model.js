
class Article {
    constructor() {
        this.author = "";
        this.title = "";
        this.description = "";
        this.url = "";
        this.urlToImage = "";
        this.publishedAt = "";
        this.keyWords = "";
        this.image = { data: null, contentType: "" };
    }

    static configMongoose() {
        return {
        author: String,
        title: String,
        description: String,
        url: String,
        urlToImage: String,
        publishedAt: String,
        keyWords: String,
        image: { data: String , contentType: String }
        }
    }

    static getObjectToUpdate(article) {
        return {
            image: article.image, 
            title: article.title, 
            description: article.description, 
            author: article.author,
            url: article.url,
            publishedAt: article.publishedAt,
            urlToImage: article.urlToImage,
            keyWords: article.keyWords
        }
    }
}

module.exports = Article;