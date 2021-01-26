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
                Instructions
            </h1>
            <p className="instructionBody">
                Welcome to SSS! Practicing with us, you will be a pro at investing stocks. You will have 10k dollars to spend! Start investing in the stock market and earn as much profit as you can in 10 years. Happy investing!
            </p>
            </>
        );
    }
}

export default Instruction