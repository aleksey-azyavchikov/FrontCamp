import { Constants } from '../../components/consts';

import React from 'react';

import { Table } from '../table/table.jsx';
import './students.scss';

export class Students extends React.Component {
    constructor(props) {
        super(props);
        this.bindHandlers();
        this.state = { data: {} }
    }

    bindHandlers() {
        this.parseData = this.parseData.bind(this);
    }

    componentDidMount() {
        this.props.getData();
        //this.setState({});
    }

    parseData() {
        this.state.data = this.props.data.map((object) => {
            let result = {
                classId: object._id.class,
                mark: object.mark_avg_in_class
            }
            return result;
        });
    }

    render() {
        console.log("Olo", this.props)
        let data = this.parseData();

        return (
        <div className="students-container">
            <div className="panel panel-default">
                <div className="panel-heading">Panel heading</div>
                <Table data={this.state.data} headers={["Class", "Score"]}/>
            </div>
        </div>);
    }
}