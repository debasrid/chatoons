import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import MessageBox from "../chat/MessageBox";
import axios from 'axios';

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
        axios.get("http://localhost:3000/friends/getFriends?userId=5d01829c42abc000e0dab2cf")
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
        var friendProfileList = this.state.friends.map(function(friend){
            return  <div><p><img src={friend.profile_picture} width="50" height="50"></img></p><p>{friend.firstname}&nbsp;{friend.lastname}</p><p>{friend.username}</p><hr /></div>;
        })
        return (
            <div className="friendlistcontainer">
                <div>
                    <h2>My Friends</h2>
                    <div><p>
                        <ul>{ friendProfileList }</ul>                    
                    </p></div>    
                </div>   
            </div>
        );
    }
}

export default FriendList;