import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import MessageBox from "../chat/MessageBox";
import axios from 'axios';
import { API_URL } from '../../config/config'

class FriendList extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUserDetails: this.props.currentUserDetails,
            friends: [],
            isAvailableforchat: false
        }
    }
    
    add(){
        let { history } = this.props;
        history.push({
         pathname: '/Signup'
        });
    }

    componentDidMount() {
        axios.get("http://localhost:5000/friends/getFriends?userId="+this.state.currentUserDetails._id)
        .then(response => {
            this.setState({
                friends: response.data,
                isAvailableforchat: true
            })
        })
    }
    
    render() {
        
        var friendProfileList = this.state.friends.map(function(friend, index){
            var friendProfileContent = <div className="dashboardcontainerinner">
                <div>
                <p><img src={friend.profile_picture} id={index} width="50" height="50"></img></p>
                <p>Name: {friend.firstname}&nbsp;{friend.lastname}</p>
                <p>Username: {friend.username}</p><hr />
                </div>
                <div><MessageBox friendusername={friend.username} /></div>
                </div>;
            return  friendProfileContent;
        })
        return (
                <div className="friendlistboxinner">
                    <h2>My Friends</h2> 
                   
                    <div>
                        <ul>{ friendProfileList }</ul>                    
                        </div>  
                </div>   
              );
    }
}

export default FriendList;