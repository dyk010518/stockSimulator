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
            <p>
                Instructions to play game
            </p>
        );
    }
}

export default Instruction