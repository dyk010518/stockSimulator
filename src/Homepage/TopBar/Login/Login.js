import './Login.css';
import React, { Component, Fragment } from "react";
import GoogleLogin from 'react-google-login';


class Login extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.loginRequest = this.loginRequest.bind(this);
  }

  loginRequest = (response) => {
		console.log("Successfully logged in");
    console.log(response);
	};
  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <Fragment>
        <GoogleLogin className="loginButton" clientId="861706660529-n3glom9el42gfl6pcs34ll6adf1v4ci2.apps.googleusercontent.com"
          buttonText= "Login" onSuccess={this.loginRequest} onFailure={this.longinRequest}/>
      </Fragment>
    );
  }
}

export default Login;