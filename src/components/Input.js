
import React, { useState } from 'react';
import './Input.css'
import { Table } from 'react-bootstrap';
import Button from './FormElements/Button';
import Nfa from './Nfa';
const Input = (props) => {
    const [final, setFinal] = useState(false)
    const input = [];
    const [nfa, setNfa] = useState([]);

    let header = [];
    header.push(<th key="States">States</th>)
    let temp = props.inputSymbol.map((symbol) => {

        return <th key={symbol}>{symbol}</th>
    })
    header = [...header, ...temp];

    header.push(<th key={"epilson"} >Epilson</ th>)
    for (let i = 0; i < props.row; i++) {
        let jsx = [];
        for (let j = 0; j < props.col + 2; j++) {
            if (j === 0)
                jsx.push(<td key={(i + 1) * (j + 1)}>{props.states[i]}</td>)
            else
                jsx.push(<td key={(i + 1) * (j + 1)}><input id={`row${i}col${j}`}></input></td>)
        }
        input.push(<tr key={i + 1}>{jsx}</tr>)
    }

    const fetchInput = () => {
        let arr = [];
        for (let i = 0; i < props.row; i++) {
            const temp = [];
            for (let j = 1; j < props.col + 2; j++) {
                temp.push(document.getElementById(`row${i}col${j}`).value);
            }
            arr.push(temp);
        }
        setNfa(arr);
        setFinal(true);
    }

    return (
        <>
            <div className="table-content">
                <h1>NFA TRANSITION TABLE</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            {header}
                        </tr>
                    </thead>
                    <tbody>
                        {input}
                    </tbody>
                </Table>

            </div>
            <div className="mid-button">
                <Button inverse onClick={fetchInput} >Convert To DFA</Button>
            </div>
            <div className="dfa-container">
                {final && <Nfa text="hello" inputSymbol={[...props.inputSymbol]} states={props.states} nfa={nfa} />}
            </div>
        </>
    )
}

export default Input;