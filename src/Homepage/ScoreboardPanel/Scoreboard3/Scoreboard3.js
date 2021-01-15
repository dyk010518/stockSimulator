import './Scoreboard3.css'
import { useState } from 'react';
import React, { Component } from "react";


class Scoreboard3 extends Component {
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
				<div onClick={this.clickHandler}>
					Scoreboard3
			</div>
			</div>
		);
	}
}

export default Scoreboard3;
