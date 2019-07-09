// components/Header.js

import React, { Component }  from 'react';
import logo from '../images/logo.png'
import {Link} from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';


class Header extends Component {

  render() {
      return (
    <header className="App-header">
        
           <div> 
             <img src= {logo}/>
            </div>
          <div>           
          {this.props.currentUser ? <span>Hi {this.props.currentUser.username}</span>: <Link to='/'>Sign-up</Link>} 
              &nbsp;&nbsp;
              {this.props.currentUser?  <Link to='/Dashboard'>Dashboard</Link> : "" }
              &nbsp;&nbsp;
          {this.props.currentUser ? <Link to='/'>Logout</Link> : <Link to='/Login'>Login</Link>}        
          </div>              
    </header>
  );
}
}
export default Header;