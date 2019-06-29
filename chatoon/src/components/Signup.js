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

            <div className="signupbox">
                <form onSubmit={e => this.handleSubmit(e)}>

                    <h1 className="signupheader">Sign up</h1>

                    <div>
                        <label>First Name:&nbsp;</label>
                        <input name="firstname"
                            type="text"
                            placeholder=""
                            value={this.state.firstname}
                            onChange={e => this.handleChange(e)} />
                    </div>

                    <div>
                        <label>Last Name:&nbsp;&nbsp;</label>
                        <input name="lastname"
                            type="text"
                            placeholder=""
                            value={this.state.lastname}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                    <div>
                        <label>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={e => this.handleChange(e)}
                        />
                    </div>

                    <div>
                        <label>Password:&nbsp;&nbsp;&nbsp;&nbsp;</label>
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
                        <label>Gender:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>

                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            id="male" />
                        {" "}
                        <label htmlFor="male">Male</label>

                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            id="female"
                        />{" "}
                        <label htmlFor="female">Female</label>

                        <input
                            type="radio"
                            name="gender"
                            value="other"
                            id="other"
                        />{" "}
                        <label htmlFor="other">Other</label>
                    </div>

                    <div className="signupheader">
                        <input type="submit" value="submit" />
                    </div>

                </form>


            </div>

        )
    }
}
