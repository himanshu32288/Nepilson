
import React from "react";
import { Table } from 'react-bootstrap';
import './Dfa.css';
const Dfa = props => {
    let header = [];
    header.push(<th key="States">States</th>)
    let temp = props.inputSymbol.map((symbol) => {
        return <th key={symbol + 999}>{symbol}</th>
    })
    header = [...header, ...temp];
    let body = [];
    for (let i = 0; i < props.dfa.length; i++) {
        let jsx = [];
        for (let j = 0; j < props.dfa[0].length; j++) {
            jsx.push(<td key={`dfa${(i + 1) * (j + 1)}`}>{props.dfa[i][j]}</td>)
        }
        body.push(<tr key={i + 1}>{jsx}</tr>)
    }

    return <div className="dfa-content">
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    {header}
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </Table>
    </div>
}

export default Dfa;