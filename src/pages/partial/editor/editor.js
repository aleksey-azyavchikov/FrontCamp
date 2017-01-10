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
        $('[type="file"]').change($.proxy(this.loadImageToBrowser, this));
    }

    loadImageToBrowser(event) {
       let filePath = event.target.files[0];
       let fileReader = new FileReader();
       fileReader.onload = (loadEvent) => {
           $("img").attr('src', loadEvent.target.result);
       }
       fileReader.readAsDataURL(filePath);
    }
}