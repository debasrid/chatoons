import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import MessageBox from "../chat/MessageBox";
import axios from 'axios';
import { API_URL } from '../../config/config'

class FriendList extends Component {
    constructor(){
        super();
        this.state = {
            friends: []
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
            this.setState({friends: response.data})
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
            return  <div><p><img src={friend.profile_picture} id={index} width="50" height="50"></img></p><p>{friend.firstname}&nbsp;{friend.lastname}</p><p>{friend.username}</p><hr /></div>;
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