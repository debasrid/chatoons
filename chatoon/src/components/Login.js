import React, { Component } from "react";
import AuthService from "../auth/AuthService";
import Dashboard from './Dashboard'

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  service = new AuthService();

  changeHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log("pressed");

    const email = this.state.email;
    const password = this.state.password;
    this.service
      .login(email, password)
      .then(response => {
        console.log("login:", response);
        this.props.setUser(response)
        ;
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="logincontainer">
        <form onSubmit={this.handleSubmit} className="loginbox">
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
          <br />

          <input type="submit" value="login" className="button-login" />
        </form>
      </div>
    );
  }
}