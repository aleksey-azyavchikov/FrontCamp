import { Storage } from '../../components/storage';
import { Constants } from '../../components/consts';

import React from 'react';

import { Brand } from '../partial/brand/brand.jsx';
import { Footer } from '../partial/footer/footer.jsx';
import { Login } from '../login/login.jsx';
import { Home } from '../home/home.jsx';
import './base.scss';

export class Base extends React.Component  {
    constructor(props) {
        super(props)
        this.state = { isPassed: false };
        this.bindHandlers();
    }

    bindHandlers() {
        this.checkLoginChange = this.checkLoginChange.bind(this);
        this.logout = this.logout.bind(this);
    }

    checkLoginChange(isPassed) {
        this.setState({isPassed: isPassed});
    }

    isHomePage() {
        let storage = Storage.getInstance();
        return storage.itemIsExist(Constants.key);
    }

    logout() {
        localStorage.removeItem(Constants.key);
        this.setState({isPassed: false});
    }

    render() {
        const isPassed = this.state.isPassed;

        let page = null;
        page = this.isHomePage() || isPassed
             ? <Home logout={this.logout}/>
             : <Login isPassed={isPassed} onChange={this.checkLoginChange}/>

        return (
            <div className="base-padding">
                <Brand></Brand>
                {page}
                <Footer></Footer>
            </div>
        );
    }
}

    // initialize() {
    //     console.log("Initilize Base Page");
    //     Router.loadComponent("Brand", { selector: "brand" });
    //     Router.loadComponent("Footer", { selector: "footer" });

    //     let storage = new Storage(localStorage);
    //     storage.itemIsExist(Constants.key) 
    //         ? Router.loadComponent("Home") 
    //         : Router.loadComponent("Login");
    // }

    // bindHandlers() {}