// components/Header.js

import React, { Component }  from 'react';
import logo from '../logo.svg'; // importing logo from src folder
import {Link} from 'react-router-dom';

class Header extends Component {

  render() {
      return (
    <header className="App-header">
        
           <div> 
             <img src= "logo.svg"/>
            </div>
          <div className="header-item">           
          {this.props.currentUser ? <p>Hi {this.props.currentUser.username} </p>: <Link to='/'>Sign-up</Link>} 
              &nbsp;&nbsp;
          {this.props.currentUser ? <Link to='/'>LOGOUT </Link> : <Link to='/Login'>Login</Link>} 
             &nbsp;&nbsp;
             {this.props.currentUser?  <Link to='/Dashboard'>Dashboard</Link> : "" }
            </div>
              
    </header>
  );
}
}
export default Header;