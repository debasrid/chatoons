import React, { Component } from 'react'
import axios from 'axios';
import { API_URL } from '../config/config'

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.currentUserDetails.username,
            firstname: this.props.currentUserDetails.firstname,
            lastname: this.props.currentUserDetails.lastname,
            email: this.props.currentUserDetails.email,
            profilepic: this.props.currentUserDetails.profile_picture
        }
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
