import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';

class Header extends Component {

  onLogin(){
    this.props.onLogin();
  }

  onLogout(){
    this.props.onLogout();
  }

  render(){
    let page;
    if(this.props.accessToken){
      page = <a onClick={this.onLogout.bind(this)} className="btn btn-info btn-lg" style={{marginLeft: '10px', marginTop: '6px', padding: '5px'}}>
          <span className="glyphicon glyphicon-log-out"></span> Log Out
        </a>
    }else{
      page = <a onClick={this.onLogin.bind(this)}  className="btn btn-info btn-lg" style={{marginTop: '6px', padding: '5px'}}>
          <span className="glyphicon glyphicon-log-in"></span> Log In
        </a>
    }
    return(
      <Navbar style={{marginBottom:'0px'}}>
        <Navbar.Header>
          <Navbar.Brand>
            <strong>Bitcoin Counter</strong>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className="navbar-right">
          {page}
        </Nav>
        {this.props.profile.email_verified ?
          <p className="navbar-text navbar-right">Signed in as <a href={this.props.profile.email}
            className="navbar-link"><strong>{this.props.profile.name}</strong></a></p> : <p style={{marginRight: '10px'}} className="navbar-text navbar-right">Please Sign In</p> }
      </Navbar>
    );
  }
}

export default Header;

//<div style={{alignItems: 'right'}}></div>
//<NavItem onClick={this.onLogout.bind(this)} className="btn btn-info btn-lg" >Logout</NavItem>
