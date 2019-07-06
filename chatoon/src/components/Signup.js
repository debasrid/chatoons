import React, { Component } from 'react';
import AuthService from '../auth/AuthService';



export default class Signup extends Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        gender: "",
    };

    authService = new AuthService();

    handleChange = e => {
        const { name, value, checked, type } = e.target;

        if (type === "checkbox") {
            value = checked;
        }
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const email = this.state.email;
        const password = this.state.password;
        const gender = this.state.gender;

        this.authService.signup(email, password)
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

                    {/* <div>
                    <label htmlFor="Privacy">Do u want your profile to be Public?</label>
                        <input
                            name="privacy"
                            type="checkbox"
                            value={this.state.privacy}
                            onChange={e => this.handleChange(e)}
                        />
                    </div> */}

                    <div onChange={e => this.handleChange(e)}>
                    <label><b>Profile Photo:</b>&nbsp;</label>
                    <input type="file" name="fileToUpload" id="fileToUpload"/>
                    </div>

                    <div className="signupheader">
                        <input type="submit" value="submit" className="button-signup"/>
                    </div>

                </form>


            </div>

        )
    }
}
