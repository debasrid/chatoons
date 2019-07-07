import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/Profile';
import FriendList from './components/Friends/FriendList';
import AddFriends from './components/Friends/AddFriends';
import MessagesContainer from './components/chat/MessagesContainer';
import MessageBox from './components/chat/MessageBox';
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
  if(this.state.email === null) {
    this.auth.currentUser()
      .then(response => {
        this.setState({email: response})
      })
      .catch(err => {
        this.setState({email: null})
      })
  }
}

componentDidMount () {
  this.fetchUser();
}
render() {
  return (
   
      <div className="App">
        <Header currentUser={this.state.email}/>
        <Switch>
          <Route exact path="/" component={Signup} />
           <Route exact path="/login"
            render={() => <Login setUser={this.setUser} />}
          /> 
           <Route
            exact
            path="/dashboard"
            render={() => <Dashboard currentUser={this.state.setUser} />}
          />
        </Switch>
         {/* <Dashboard />        <MessagesContainer/> */}
      {/* </div>
      <UserProfile/>
      <FriendList/>
      <AddFriends/>
      <MessageBox /> */}
       </div>
  );
}
}
export default App;
