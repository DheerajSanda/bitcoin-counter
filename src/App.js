import React, { Component } from 'react';
import './App.css';
import Bitcoin from './Bitcoin';
import LoginPage from './LoginPage';
import Header from './Components/Header.js';
import Auth0Lock from 'auth0-lock';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      accessToken: '',
      profile: {}
    };
  }

  static defaultProps = {
    clientID: 'iIdbs57tygkz1rR6TIHnJ8SiHyTraXvI',
    domain: 'dheerajsanda.auth0.com'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);

    this.lock.on('authenticated', (authResult) => {
      //console.log(authResult);

      this.lock.getProfile(authResult.accessToken, (error, profile) => {
        if(error){
          console.log(error);
          return;
        }
        console.log('profile',profile);
        console.log('authResult.accessToken', authResult.accessToken);

        this.setProfile(authResult.accessToken, profile);

      });

    });
    this.getProfile();

  }

  setProfile(accessToken, profile){
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      accessToken: localStorage.getItem('accessToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }


  getProfile(){
    if(localStorage.getItem('accessToken') != null){
      this.setState({
        accessToken: localStorage.getItem('accessToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      },() => {
        console.log('this.state',this.state);
      });
    }
  }

  showLock(){
    this.lock.show();
  }

  logout(){
    this.setState({
      accessToken: '',
      profile: ''
    }, () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('profile');
    });
  }

  render() {
    return (
      <div className="App">
        <Header
          lock={this.lock}
          accessToken={this.state.accessToken}
          profile={this.state.profile}
          onLogout={this.logout.bind(this)}
          onLogin={this.showLock.bind(this)}
           />
          {
            this.state.accessToken ?
            <Bitcoin />
            :
            <LoginPage />
          }
        
      </div>
    );
  }
}

export default App;
