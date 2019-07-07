import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import MessageBox from "../chat/MessageBox";
import axios from 'axios';
import { API_URL } from '../../config/config'

class FriendList extends Component {
    constructor(){
        super();
        this.state = {
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
        axios.get("http://localhost:5000/friends/getFriends?userId=5d01829c42abc000e0dab2cf")
        .then(response => {
            this.setState({
                friends: response.data,
                isAvailableforchat: true
            })
        })
    }
    
    render() {
        /*
        const friends = [
            {
               firstname: "matt",
                lastname: "hamers",
                email: "matt@email.com",
            },
            {
                firstname: "debby",
                 lastname: "dasgupta",
                 email: "debby@email.com",
             },
             {
                firstname: "jorg",
                 lastname: "houtermans",
                 email: "jorg@email.com",
             }
        ] 
        */
        var friendProfileList = this.state.friends.map(function(friend, index){
            var friendProfileContent = <div><p><img src={friend.profile_picture} id={index} width="50" height="50"></img></p><p>Name: {friend.firstname}&nbsp;{friend.lastname}</p><p>Username: {friend.username}</p><hr /><div><MessageBox friendusername={friend.username} /></div></div>;
            return  friendProfileContent;
        })
        return (
            <div className="friendlistcontainer">
                <div>
                    <h2>My Friends</h2> 
                    <div>
                        <ul>{ friendProfileList }</ul>                    
                    </div>    
                </div>   
            </div>
        );
    }
}

export default FriendList;