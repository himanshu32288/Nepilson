
import React from "react";
import { Table } from 'react-bootstrap';
import './Dfa.css';
import { Graphviz } from 'graphviz-react';
const Dfa = props => {

    let dotStr = "digraph fsm {\n";
    dotStr += "rankdir=LR;\n";
    dotStr += 'size="8,5";\n';
    dotStr += "node [shape = doublecircle]; " + props.final_state + ";\n";
    dotStr += "node [shape = point]; INITIAL_STATE\n";
    dotStr += "node [shape = circle];\n";
    dotStr += "INITIAL_STATE -> " + props.dfa[0][0] + ";\n";
    
    let header = [];
    header.push(<th key="State">States</th>)
    let temp = props.inputSymbol.map((symbol) => {
        return <th key={symbol + 999}>{symbol}</th>
    })
    header = [...header, ...temp];
    let body = [];
    for (let i = 0; i < props.dfa.length; i++) {
        let jsx = [];
        for (let j = 0; j < props.dfa[0].length; j++) {
            jsx.push(<td key={`dfa${(i + 1) * (j + 1)}`}>{props.dfa[i][j]}</td>)
            if (j > 0 ) {
                dotStr +=`
                    ${props.dfa[i][0]}
                     ->  
                    ${props.dfa[i][j]==="-"?"Trap":props.dfa[i][j]} 
                     [label= 
                    ${props.inputSymbol[j - 1]} 
                    ];\n`;
            }
        }
        body.push(<tr key={i + 1}>{jsx}</tr>)
    }
    dotStr += "}";

    return <div className="dfa-content">
        <h1>DFA TRANSITION TABLE:</h1>
        <Table striped bordered hover responsive style={{ marginBottom: '50px' }}>
            <thead>
                <tr>
                    {header}

                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </Table>
        <h1>DFA TRANSITION DIAGRAM:</h1>
        <div className="dfa-transition-diagram">
            <Graphviz dot={`${dotStr}`} />
        </div>
    </div>
}

export default Dfa;
