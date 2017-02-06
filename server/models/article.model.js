
class Article {
    constructor() {
        this.author = "";
        this.title = "";
        this.description = "";
        this.url = "";
        this.urlToImage = "";
        this.publishedAt = "";
        this.image = { data: Buffer, contentType: String };
    }

    static configMongoose() {
        return {
        author: String,
        title: String,
        description: String,
        url: String,
        urlToImage: String,
        publishedAt: String,
        image: { data: Buffer , contentType: String }
        }
    }
}

module.exports = Article;