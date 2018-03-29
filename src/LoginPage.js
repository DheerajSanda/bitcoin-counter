import React, { Component } from 'react';
import logo from './bitlogo.png';

class LoginPage extends Component {
  render(){
    return(
      <div>
        <img src={logo} alt="logo" style={{padding: '6px', height: '200px' }} />
        <div className = "container" style={{marginTop: '20px'}}>
          <div className="row text-center">
            <div className="jumbotron">
              <h1><strong>Bitcoin Counter</strong></h1>
              <p>A ReactJS app that calculates the return on investment of Bitcoins</p>
              <p>Please login to continue</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
