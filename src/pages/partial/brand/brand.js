import { BaseComponent } from '../../../components/base-component';

import './brand.scss';

export default class Brand extends BaseComponent {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    initialize() {
        console.log("Initilize Brand Component");
    }

    bindHandlers() {
    }
}