import React from 'react';

import { Storage } from '../../components/storage';
import { Constants } from '../../components/consts';
import { ValidationFactory, ValidationConditions } from '../../components/validation';

import './login.scss';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.bindHandlers();
        this.state = { apiKey: "", isPassed: props.isPassed };

    }

    bindHandlers() {
        this.storeApiKey = this.storeApiKey.bind(this);
        this.handleApiKey = this.handleApiKey.bind(this);
        this.loginPassedEmit = this.loginPassedEmit.bind(this);
    }

    handleApiKey(event) {
        this.setState({ apiKey: event.target.value })
    }

    loginPassedEmit() {
        this.props.onChange(true);
    }

    render() {
        const apikey = this.state.apiKey;

        return (
            <div>
                <div className="page-header">
                    <h3>Please put api key</h3>
                </div>
                <div className="panel panel-default login-panel">
                    <form onSubmit={this.storeApiKey}>
                        <div className="form-group">
                            <label htmlFor="Api">Api Key:</label>
                            <input value={apikey} onChange={this.handleApiKey} type="text" name="Api" className="form-control" />
                            <button type="submit" className="btn btn-default login-submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }


    storeApiKey(event) {
        event.preventDefault();
        let validator = ValidationFactory
            .getInstance()
            .getProxy(ValidationConditions.apiKeyField);
        let object = this.checkValue(validator, this.state.apiKey);
        object.passed ? this.storeApiKeyInStorage() : console.log("Failed", object);
    }

    storeApiKeyInStorage() {
        let storage = Storage.getInstance();
        storage.setItem(Constants.key, this.state.apiKey);
        this.loginPassedEmit();
    }

    checkValue(validator, value) {
        try {
            validator.value = value;
        } catch (error) {
            return { passed: false, message: error }
        }
        return { passed: true, message: "" }
    }
}