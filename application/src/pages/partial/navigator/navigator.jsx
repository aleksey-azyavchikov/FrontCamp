import React from 'react';

import './navigator.scss';

export class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = { page: this.props.page, pages: this.props.pages };
        this.bindHandlers();
    }
    
    bindHandlers() {
        //this.tabClick = this.tabClick.bind(this);
    }

    tabClick(event) {
        this.setState({ page: event.target.name })
        this.props.onChange({ page: event.target.name })
    }

    render() {
        const selectetPage = this.state.page;
        const tabs = this.state.pages.map((page, index) => {
            let active = selectetPage === page
                ? "active"
                : "";
            return <li 
                    onClick={this.tabClick.bind(this)}
                    key={index} 
                    className={active} 
                    role="presentation">
                        <a name={page} href="#">{page}</a>
                </li>
        });

        return (
            <ul className="nav nav-tabs navigator-pad">
                {tabs}
            </ul>
        )
    }
}

function TabElement (props) {
    return <li role="presentation" className={this.props.active}><a href="#">News</a></li>
}