import { Page } from '../../components/page';
import { Router } from '../../components/router';
import { ApiInvoker } from '../../components/api';
import { Constants } from '../../components/consts';

import './students.scss';

export default class StudentsPage extends Page {
    /** config { key, content } */
    constructor(config) {
        super(config);
    }

    get tbody() {
        return $("tbody");
    }

    buildPage(selector) {
        super.loadContent(this.content, () => {
            this.initialize();
            this.bindHandlers();
        }, selector);
    }

    initialize() {
        console.log("Initilize Students Page");
        this.tbody.empty();
        this.tbody.children().remove();
        let apiInvoker = new ApiInvoker(null);
        apiInvoker.getJson(
            ApiInvoker.buildUrl(Constants.apiServer, Constants.apiEndPoints.bestclass),
            { method: "GET", mode: "cors" },
            (data) => {
                const template = `${data.map(classitem => `
                <tr>
                    <td>${classitem._id.class}</td>
                    <td>${classitem.mark_avg_in_class}</td>
                </tr>`)}`;
                this.tbody.append(template);
            },
            (error) => {
                this.showErrorMessage(error);
            });
    }

    bindHandlers() {
    }
}