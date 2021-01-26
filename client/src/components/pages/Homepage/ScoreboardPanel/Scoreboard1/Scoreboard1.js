import './Scoreboard1.css'
import { useState } from 'react';
import React, { Component } from "react";

class Scoreboard1 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
		this.state = {
			userId1: undefined,
			userId2: undefined,
			userId3: undefined,
			userName1: "Bob",
			userName2: "Mary",
			userName3: "Paul",
			total1: 123,
			total2: 123,
			total3: 123,
		}
	}

	clickHandler = () => {
		console.log("fill me pls")
	};

	componentDidMount = () => {

	}

	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<div>
				<div onClick={this.clickHandler} className = "Scoreboard1-basics">
				<div className="Scoreboard1-resultHeader">
                    <div className="Scoreboard1-resultDesctiption"> Rank</div>
                    <div className="Scoreboard1-resultDesctiption"> Player Name</div>
                    <div className="Scoreboard1-resultDesctiption"> Total Account Value</div>

					<div className="Scoreboard1-resultDesctiption"> 1</div>
                    <div className="Scoreboard1-resultDesctiption"> {this.state.userName1}</div>
                    <div className="Scoreboard1-resultDesctiption"> {this.state.total1}</div>

					<div className="Scoreboard1-resultDesctiption"> 2</div>
                    <div className="Scoreboard1-resultDesctiption"> {this.state.userName2}</div>
                    <div className="Scoreboard1-resultDesctiption"> {this.state.total2}</div>

					<div className="Scoreboard1-resultDesctiption"> 3</div>
                    <div className="Scoreboard1-resultDesctiption"> {this.state.userName3}</div>
                    <div className="Scoreboard1-resultDesctiption"> {this.state.total3}</div>
                </div>

				
				</div>
				
			</div>
		);
	}
}

export default Scoreboard1;
