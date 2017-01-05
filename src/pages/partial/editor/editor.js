import { BaseComponent } from '../../../components/base-component';

import './editor.scss';

export default class Editor extends BaseComponent {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    initialize() {
        console.log("Initilize Editor Component");
    }

    bindHandlers() {
    }
}