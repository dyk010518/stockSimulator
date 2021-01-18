import './TopBar.css';
import Login from './Login/Login.js';
import Title from './Title/Title.js';
import React, { Component } from "react";

class TopBar extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <>
      <header className="TopBar-header">
        <Title username={this.props.username}/>
      </header>
      <div className='TopBar-right'>
        <Login 
            handleLogin={this.props.handleLogin}
            handleLogout={this.props.handleLogout}
            userId={this.props.userId}
            
        />
      </div>
      </>
    );
  }
}

export default TopBar;