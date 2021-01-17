import './Login.css';
import React, { Component, Fragment } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import '../../../../../utilities.css'


const GOOGLE_CLIENT_ID = "861706660529-ij4qla5vskuqqfa90lqog4366eol4tch.apps.googleusercontent.com";


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
      {this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </>
    )
  }

}

export default Login;