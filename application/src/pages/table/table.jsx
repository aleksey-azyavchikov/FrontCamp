import React from 'react';

export class Table extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    checkParameters() {
        let data = this.props.data;
        if( data === undefined ||
            data === null ||
            data.length === 0) {
            //console.error("Data in table is invalid", data)
            return false;
        }
        return true;
    }

    buildHeaders() {
        let headers = null;
        headers = this.props.headers.map((header, index) => 
        <th key={index}>{header}</th>);
        headers = <tr key={0}>{headers}</tr>
        return headers;
    }

    buildRows() {
        let rows = null;
        rows = this.props.data.map((object, index) => {
            let row = [];
            let keyIndex = 0;
            for (let prop in object ) {
                if(!object.hasOwnProperty(prop)) continue;
                let data = object[prop];
                row.push(<td key={keyIndex}>{data}</td>);
                keyIndex ++;
            }
            row = <tr key={index}>{row}</tr>
            return row;
        })
        return rows;
    }

    render() {
        console.log("Table re render", this.props);
        if(!this.checkParameters()) return null;
        console.log("Table has data", this.props);
        let headersComponent = this.buildHeaders();
        let rowsComponent = this.buildRows();

        return (
            <table className="table">
                <thead>
                    {headersComponent}
                </thead>
                <tbody>
                    {rowsComponent}
                </tbody>
            </table>
        );
    }
}