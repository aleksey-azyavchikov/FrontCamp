import { BaseComponent } from '../../../components/base-component';
import { ApiInvoker } from '../../../components/api';
import { Constants } from '../../../components/consts';
import { HtmlParser } from '../../../components/html-parser.helper';
import { Article } from '../../../models/article.model';

import './editor.scss';

export default class Editor extends BaseComponent {
    /** config { key, content } */
    constructor(config) {
        super(config);
        this.filePath;
        this.file;
    }

    initialize() {
        console.log("Initilize Editor Component");
    }

    bindHandlers() {
        $("[type='file']").change($.proxy(this.loadImageToBrowser, this));
        $("button[type='button']").click($.proxy(this.sendArticle, this));
    }

    loadImageToBrowser(event) {
       this.filePath = event.target.files[0];
       let fileReader = new FileReader();
       fileReader.onload = (loadEvent) => {
           this.file = loadEvent.target.result;
           $("img").attr('src', loadEvent.target.result);
       }
       fileReader.readAsDataURL(this.filePath);
    }

    sendArticle() {
        let article = this.getArticle();
        let apiInvoker = new ApiInvoker(null);
        apiInvoker.invoke(
            ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.post.news.article),
            { method: "POST", headers: { "Content-Type": "application/json" }, mode: "cors", body: JSON.stringify(article) },
            () => {
                console.log("Success");
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getArticle() {
        let article = new Article();
        article.title = $("input[name='title']").val();
        article.description = $("input[name='description']").val();
        article.author = $("input[name='author']").val();
        if (this.file !== null && 
            this.file !== undefined &&
            this.filePath !== null &&
            this.filePath !== undefined)
        {   
            article.image.data = this.file;
            article.image.contentType = this.filePath.type;
        }
        return article;
    }
}