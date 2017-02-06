import { BaseComponent } from '../../../components/base-component';

import './footer.scss';

export default class Footer extends BaseComponent {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    initialize() {
        console.log("Initilize Footer Component");
    }

    bindHandlers() {
    }
}