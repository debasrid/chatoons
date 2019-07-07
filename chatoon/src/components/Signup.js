import React, { Component } from 'react';
import AuthService from '../auth/AuthService';



export default class Signup extends Component {
    state = {
        username:"",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        profilepicture: "",
    };

    authService = new AuthService();

    handleChange = e => {
        const { name, value} = e.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const username = this.state.username;
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const email = this.state.email;
        const password = this.state.password;
        const profile_picture = this.state.profile_picture;

        this.authService.signup(username,firstname, lastname,email, password, profile_picture)
            .then(response => {
                console.log(response);
            })
    };

    render() {
        return (

            <div className="signupcontainer">
                <form onSubmit={e => this.handleSubmit(e)} className="signupbox">

                    <h1 className="signupheader">Sign up</h1>
                    <div>
                        <label><b>User Name:</b>&nbsp;&nbsp;</label>
                        <input name="username"
                            type="text"
                            placeholder=""
                            value={this.state.username}
                            onChange={e => this.handleChange(e)} />
                    </div>

                    <div>
                        <label><b>First Name:</b>&nbsp;&nbsp;</label>
                        <input name="firstname"
                            type="text"
                            placeholder=""
                            value={this.state.firstname}
                            onChange={e => this.handleChange(e)} />
                    </div>

                    <div>
                        <label><b>Last Name:</b>&nbsp;&nbsp;</label>
                        <input name="lastname"
                            type="text"
                            placeholder=""
                            value={this.state.lastname}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                    <div>
                        <label><b>Email:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                    <div>
                        <label><b>Password:</b>&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                    <div onChange={e => this.handleChange(e)}>
                    <label><b>Profile Photo:</b>&nbsp;</label>
                    <input type="file" name="fileToUpload" value={this.state.profile_picture}/>
                    </div>

                    <div className="signupheader">
                        <input type="submit" value="submit" className="button-signup"/>
                    </div>

                </form>


            </div>

        )
    }
}
