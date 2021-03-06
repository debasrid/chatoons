import React, { Component } from 'react'
import axios from 'axios';
import { API_URL } from '../config/config'

export default class Profile extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            profile_picture: ''
        }
    }

    componentDidMount() {
        
        var userprofileapi = "http://localhost:5000/users/5d0c0ac5602bbd448c9d4ee4";
        
        axios.get(userprofileapi)
        .then(response => {
            this.setState({
                username: response.data.username,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                profilepic: response.data.profile_picture[0]
            })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <div><h2><br/>My Profile</h2></div>
                   <br/>
                    <div>
                        <p><img src={this.state.profilepic} width="50" height="50"></img></p>
                        <p><b>Name:</b>&nbsp;{this.state.firstname}&nbsp;{this.state.lastname}</p>
                        <p><b>Username:</b>&nbsp;{this.state.username}</p>
                        <p><b>Email:</b>&nbsp;{this.state.email}</p>
                    </div>
                </div>
            </div>
        )
    }
}
