
import React from 'react';

import '../news/news.scss';

export class Article extends React.Component  {
    constructor(props) {
        super(props);
    }

    render() {
        let urlToImage = this.props.article.urlToImage;
        if (urlToImage === undefined || urlToImage === null || urlToImage==="") {
            urlToImage = "../../resources/images/default-thumbnail.jpg";
        }

        if (this.props.article.image !== undefined &&
            this.props.article.image.data !== undefined && 
            this.props.article.image.data !== null &&
            this.props.article.image.data !== "") {
               urlToImage = this.props.article.image.data.toString("base64");
        }
        return (
            <div className="panel panel-default news-panel">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.article.title}</h3>
                </div>
                <div className="panel-body">
                    <img className="news-image" src={urlToImage}/>
                        <div>{this.props.article.description}</div>
                        <a href={this.props.article.url}>Source</a>
                        <div>{this.props.article.author}</div>
                        <div>{this.props.article.publishedAt}</div>
                </div>
            </div>
        )
    }
}