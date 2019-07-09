import React, { Component } from 'react';
import Profile from './Profile';
import Friendlist from '../components/Friends/FriendList';
import Addfriend from './Friends/AddFriends'
import ChatRequest from './chat/ChatRequest';

export default class Dashboard extends Component {
    render() {
        return (
            <div className="dashboardcontainer">
                <div className="profilebox"><Profile currentUserDetails={this.props.currentUserDetails}/>
                <p className="addfriendbox"><Addfriend currentUserDetails={this.props.currentUserDetails}/></p>
                </div>
                
                <div className="friendlistbox"><Friendlist currentUserDetails={this.props.currentUserDetails}/></div>
                <div className="dashboardrightdiv">
                <p className="chatrequestbox" ><ChatRequest currentUserDetails={this.props.currentUserDetails}/></p>

                
                </div>
            </div>
        )
    }
}
