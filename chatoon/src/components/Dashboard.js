gimport React, { Component } from 'react';
import Profile from './Profile';
import Friendlist from '../components/Friends/FriendList';
import Addfriend from './Friends/AddFriends'

export default class Dashboard extends Component {
    render() {
        return (
            <div className="dashboardcontainer">
                <p className="profilebox"><Profile/></p>
                <hr/>
                <p className="addfriendbox"><Friendlist/></p>
                <p className="searchfriendbox"><Addfriend/></p>
            </div>
        )
    }
}
