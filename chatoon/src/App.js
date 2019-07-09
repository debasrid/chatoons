import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AuthService from './auth/AuthService';


require('dotenv').config();

class App extends Component {
  state = {
    email: null
  };

  auth = new AuthService();

  setUser = email => {
    this.setState({ email: email });
  };

  fetchUser = () => {
    if (this.state.email === null) {
      this.auth.currentUser()
        .then(response => {
          this.setState({ email: response })
        })
        .catch(err => {
          this.setState({ email: null })
        })
    }
  }

  componentDidMount() {
    this.fetchUser();
  }
  render() {
    return (

      <div className="App">
        <Header currentUser={this.state.email} />
        <Switch>
          <Route exact path="/" render={() => <Signup/>} />
          <Route exact path="/login"
            render={() => <Login setUser={this.setUser}/> }
          />
          <Route
            exact path="/dashboard"
            render={() => <Dashboard currentUserDetails={this.state.email} />}
          />
          <Route
            exact path="/logout" component={Signup}/>}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
