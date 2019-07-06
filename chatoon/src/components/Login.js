import React, { Component } from "react";
import AuthService from '../auth/AuthService';

export default class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    service = new AuthService();

    changeHandler = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
      };

      handleSubmit = (e) => {
        e.preventDefault();
        
        const email = this.state.email;
        const password = this.state.password;
  
        this.service.login(email, password)
          .then(response => {
              console.log(response);
              this.props.setUser(response)
          })
    }
    render() {
        return (
            <div className="logincontainer">
                 <form onSubmit={e => this.handleSubmit(e)} className="loginbox">
                     <h1>Login</h1>
                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="your email"
                            value={this.email}
                            onChange={e => this.changeHandler(e)}
                        />
                    </div>

                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={this.Password}
                            onChange={e => this.changeHandler(e)}
                        />
                    </div>
                    <br/>
                    <input type="submit" value="signup" className="button-login" />
                    </form>
            </div>
        )
    }
}
