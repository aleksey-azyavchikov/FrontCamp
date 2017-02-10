import { ApiInvoker } from '../../components/api';
import { Storage } from '../../components/storage';
import { Constants } from '../../components/consts.js';
 
import React from 'react';

import { Article } from '../article/article.jsx';
import './news.scss';
export class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = { logout: this.props.logout, getData: this.props.getData }
    }

    bindHandlers() {
        this.resetApiKey = this.resetApiKey.bind(this);
        this.downloadNews = this.downloadNews.bind(this);
    }

    render() {
        const articles = this.props.articles;

        let articleComponents = null;
        if (articles !== undefined &&  articles !== null) {
            articleComponents = articles.map((article, index) =>
                <Article key={index} article={article}/>)
            articleComponents = <ul>{articleComponents}</ul>;
        } 

        return (
            <div>
                <div className="page-header common-pad">
                    <h3>Main content today from <a href={this.props.href} className="navbar-link">{this.props.title}</a></h3>
                </div>
                <div className="news-container">
                    <div className="btn-group common-pad">
                        <button onClick={this.downloadNews.bind(this)} className="btn btn-default">
                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
                            Show News
                        </button>
                        <button onClick={this.resetApiKey.bind(this)} className="btn btn-default">Reset Api Key</button>
                    </div>
                    <div className="content-news">
                        {articleComponents}
                    </div>
                </div>
            </div>
        );
    }

    resetApiKey(event) {
        this.state.logout();
    }

    downloadNews() {
        this.state.getData();
    }
}