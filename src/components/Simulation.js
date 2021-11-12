import React, { useState } from "react";
import Button from './FormElements/Button'
import './Simulation.css'
import Input from './Input'
// import Card from './UIElements/Card'
const Simulation = props => {
    const [transition, setTransition] = useState(false);
    const [inputSymbol, setSymbol] = useState([])
    const [states, setStates] = useState([]);
    const onSubmitHandler = (event) => {
        event.preventDefault();

    }

    const getInput = (event) => {
        setTransition(true);

        let symbols = [...document.getElementById('inputSymbol').value.split(',')]
        setSymbol(symbols);
        let inputStates = document.getElementById('states').value.split(',');
        setStates(inputStates);
    }
    const reset = () => {
        setTransition(false);
        setSymbol([]);
        setStates([]);
    }

    return (<>
        <form className="form-holder" onSubmit={onSubmitHandler}>
            <label >Enter States </label>
            <input type="text" id="states" placeholder="Enter States in CSV format" ></input>
            <label>Enter Number Input Symbols</label>
            <input type="text" id="inputSymbol" placeholder="Enter Symbol In CSV form"></input>
            <div className="Button-content">
                <Button success onClick={getInput}>Next</Button>
                <Button danger onClick={reset} >Reset</Button>
            </div>
        </form>

        {transition && <Input row={states.length} col={inputSymbol.length} inputSymbol={inputSymbol} states={states} />}

    </>);
}

export default Simulation;