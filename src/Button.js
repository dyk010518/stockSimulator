import { useState } from 'react';
import React, { Component } from "react";


class Button extends Component {
	// makes props available in this component
	constructor(props) {
		super(props);
		this.state = {
			clicks: 0,
		}
	}


	clicked = (numClicks) => {
		this.setState({
			clicks: numClicks + 1,
		})
	};
	// required method: whatever is returned defines what
	// shows up on screen
	render() {
		return (
			<div>
				<button onClick={this.clicked(this.state.clicks)}>Clicks: {this.state.clicks}</button>
			</div>
		);
	}
}

export default Button;
