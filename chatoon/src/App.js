import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Signup from './components/Signup';
import UserProfile from './components/Profile';
import FriendList from './components/Friends/FriendList';
import AddFriends from './components/Friends/AddFriends';
import MessagesContainer from './components/chat/MessagesContainer';
import MessageBox from './components/chat/MessageBox';

function App() {
  return (
    // <div className="bgcontainer">
    //   <Header/>
    //   <div className="bg">
    //     <div className="bgboxright"> </div>
    //     <div>
    //     {/* <Signup/> */}
    //    </div>
    //   </div> 
  
    // </div>
    <div>
      <UserProfile/>
      <FriendList/>
      <AddFriends/>
      <MessageBox />
       </div>
  );
}

export default App;
