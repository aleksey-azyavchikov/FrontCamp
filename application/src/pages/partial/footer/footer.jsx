
import React from 'react';

import './footer.scss';

export class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>Footer</div>
        )
    }

    initialize() {
        console.log("Initilize Footer Component");
    }

    bindHandlers() {
    }
}