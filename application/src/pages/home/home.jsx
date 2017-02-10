import { ValidationFactory, ValidationConditions } from '../../components/validation';
import { ApiInvoker } from '../../components/api';
import { Storage } from '../../components/storage';
import { Constants } from '../../components/consts';
import { PageEnum } from '../../components/consts';

import React from 'react';

import { News } from '../news/news.jsx';
import { Students } from '../students/students.jsx';
import { Editor } from '../partial/editor/editor.jsx';
import { Navigator } from '../partial/navigator/navigator.jsx';
import { Article } from '../../models/article.model'
import './home.scss';

export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            page: PageEnum.News, 
            pages: this.getPages(), 
            articles: [],
            bestclass: [],
            article: new Article()
        };
        this.bindHandlers();
    }

    bindHandlers() {
        this.pageChange = this.pageChange.bind(this);
        this.invokeRequest = this.invokeRequest.bind(this);
    }

    render () {
        const page = this.state.page;
        const pages = this.state.pages;
        
        let pageComponent = null;
        pageComponent = this.getPageComponent(page);

        return (
            <div>
                <Navigator onChange={this.pageChange} page={page} pages={pages}></Navigator>
                {pageComponent}
            </div>
        )
    }

    pageChange(page) {
        this.setState({page: page.page, articles: [] });
    }

    getNewsOrgUrl() {
        let apiInvoker = ApiInvoker.getInstance();
        let storage = Storage.getInstance();
        let url = apiInvoker.getNewsApiUrl(storage.getItem(Constants.key));
        return url;
    }

    getToLocalServerUrl(endpoint) {
         let url = ApiInvoker.buildUrl(
             Constants.apiServer, 
             endpoint);
        return url;
    }

    getPages() {
        let array = [];
        for (let index in PageEnum) {
            if (!PageEnum.hasOwnProperty(index)) continue;
            array.push(PageEnum[index]);
        }
        return array;
    }

    invokeRequest(request) {
        switch(this.state.page) {
            case "News": {
                this.apiCall(
                    this.getNewsOrgUrl(), 
                    { method: "GET", mode: "cors" },
                    (data) => this.setState({articles: data.articles}),
                    (error) => console.error("Api call 'news'", error)
                );
            } break;
            case "Archive": {
                this.apiCall(
                    this.getToLocalServerUrl(Constants.apiEndPoints.get.news),
                    { method: "GET", mode: "cors" },
                    (data) => this.setState({articles: data.articles}),
                    (error) => console.error("Api call 'atchive'", error)
                )
            } break;
            case "Students" : {
                this.apiCall(
                    this.getToLocalServerUrl(Constants.apiEndPoints.get.bestclass),
                    { method: "GET", mode: "cors" },
                    (data) => this.setState({ bestclass: data }),
                    (error) => console.error("Api call 'students'", error)
                )
            } break;
            case "Editor" : {
                this.apiCall(
                    this.getToLocalServerUrl(Constants.apiEndPoints.post.news.article),
                    { method: "POST", headers: { "Content-Type": "application/json" }, mode: "cors", body: JSON.stringify(request.body) },
                    (data) => console.log("Success", data),
                    (error) => console.error("Api call 'editor'", error)
                )
            } break;
            default: break
        }
    }

    getPageComponent(page) {
        let component = null;
        switch(page) {
            case "News": component = <News
                articles = {this.state.articles}
                logout={this.props.logout}
                getData={this.invokeRequest}
                title="Newsapi.org"
                href="https://newsapi.org">
                </News>
                break;
            case "Archive": component = <News
                articles = {this.state.articles}
                logout={this.props.logout}
                getData={this.invokeRequest}
                title="Archive"
                href="#">
                </News>
                break;
            case "Students": {
                component = <Students
                data = {this.state.bestclass}
                getData = {this.invokeRequest}>
                </Students>
            } break;
            case "Editor": {
                component = <Editor
                article = {this.state.article}
                postData = {this.invokeRequest}>
                </Editor>
            } break;
            default: component
        }
        return component;
    }

    apiCall(url, init, succesHandler, errorHandler) {
        let apiInvoker = ApiInvoker.getInstance();
            apiInvoker.invoke(
                url, 
                init,
                (data) => {
                    succesHandler(data)
                },
                (error) => {
                    errorHandler(error)
                }
            );
    }
}