import React from 'react';

import { Article } from '../../../models/article.model'

import './editor.scss';

export class Editor extends React.Component {
    /** config { key, content } */
    constructor(props) {
        super(props);
        this.state = { 
            article: this.props.article,
        }
        this.filePath;
        this.file;
        this.bindHandlers();
    }

    initialize() {
        console.log("Initilize Editor Component");
    }

    bindHandlers() {
        this.loadImageToBrowser = this.loadImageToBrowser.bind(this);
        this.sendArticle = this.sendArticle.bind(this);
        this.dataChange = this.dataChange.bind(this);
    }
    
    dataChange(model) {
        let state = this.state ;
        state.article[model.field] = model.event.target.value;
        this.setState(state);
    }

    render() {
        const src = 
            this.state.article.image.data !== undefined && 
            this.state.article.image.data !== null 
                ?  this.state.article.image.data 
                : "../../resources/images/default-thumbnail.jpg";

        return (
            <div className="container">
                <div className="editor-container">
                    <div className="editor">
                        <form onSubmit={this.sendArticle}>
                            <div className="row">
                                <div className="col-md-2 col-sm-2">
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-4">
                                    <Input value={this.state.article.title} for={"title"} label={"Title"} onChange={this.dataChange}/>
                                    <div className="thumbnail">
                                        <img className="img-responsive" name="image" src={src} />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.loadImageToBrowser} type="file" name="file" defaultValue="Load Image" />
                                    </div>
                                    <Input value={this.state.article.keyWords} for={"keyWords"}  label={"KeyWords"} onChange={this.dataChange}/>
                                </div>
                                <div className="col-xs-12 col-sm-4 col-md-4">
                                    <Textarea value={this.state.article.description} for={"description"}  label={"Main Content"} onChange={this.dataChange}/>
                                    <Input value={this.state.article.author} for={"author"}  label={"Author"} onChange={this.dataChange}/>
                                    <div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-2">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    loadImageToBrowser(event) {
       this.filePath = event.target.files[0];
       let fileReader = new FileReader();
       fileReader.onload = (loadEvent) => {
           this.file = loadEvent.target.result;
           let article = this.state.article;
           article.image.data = loadEvent.target.result;
           this.setState({ article: article });
       }
       fileReader.readAsDataURL(this.filePath);
    }

    sendArticle(event) {
        event.preventDefault();
        let article = this.getArticle();
        this.props.postData({body: article});
    }

    getArticle() {
        let article = new Article();
        article.title = this.state.article.title
        article.description = this.state.article.description
        article.author = this.state.article.author
        article.keyWords = this.state.article.keyWords
        article.publishedAt = new Date();
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

export class Input extends React.Component  {
    constructor(props) {
        super(props);
        this.valueChange = this.valueChange.bind(this);
    }

    valueChange(value) {
        this.props.onChange({event: value, field: this.props.for});
    }
    render() {
            return (
            <div className="form-group">
                <label htmlFor={this.props.for}>{this.props.label}</label>
                <input value={this.props.value} onChange={this.valueChange}  className="form-control" name={this.props.for}/>
            </div>
        )
    }
}

export class Textarea extends React.Component  {
    constructor(props) {
        super(props);
        this.valueChange = this.valueChange.bind(this);
    }

    valueChange(value) {
        this.props.onChange({event: value, field: this.props.for});
    }
    render() {
            return (
            <div className="form-group">
                <label htmlFor={this.props.for}>{this.props.label}</label>
                <textarea value={this.props.value} onChange={this.valueChange}  className="form-control" name={this.props.for}/>
            </div>
        )
    }
}