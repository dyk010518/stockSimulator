import './Scoreboard1.css'
import { useState } from 'react';
import React, { Component } from "react";

class Scoreboard1 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
	}

	clickHandler = () => {
		console.log("fill me pls")
		console.log(screen.width);
	};

	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<div>
				<div onClick={this.clickHandler} className = "Scoreboard1-basics">
					Scoreboard1
				</div>
			</div>
		);
	}
}

export default Scoreboard1;
