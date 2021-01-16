import './Scoreboard2.css'
import { useState } from 'react';
import React, { Component } from "react";

class Scoreboard2 extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
	}

	clickHandler = () => {
		console.log("fill me pls")
	};

	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<div>
				<div onClick={this.clickHandler} className = "Scoreboard2-basics">
					Scoreboard2
			</div>
			</div>
		);
	}
}

export default Scoreboard2;
