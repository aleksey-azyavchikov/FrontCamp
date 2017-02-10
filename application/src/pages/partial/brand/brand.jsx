import React from 'react';

import './brand.scss';

export function Brand (props) {
    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">BBC News</a>
            </div>
        </nav>
    );   
}