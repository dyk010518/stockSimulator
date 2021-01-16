import "./Instruction.css";
import React, { Component } from "react";


class Instruction extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
            <h1 className="instructionHead">
                Instructions:
            </h1>
            <p className="instructionBody">
                blah blah blah
            </p>
            </>
        );
    }
}

export default Instruction