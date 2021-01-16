import './Login.css';
import React, { Component } from "react";

class Login extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <>
      <button className="loginButton" >Login</button>
      </>
    );
  }
}

export default Login;