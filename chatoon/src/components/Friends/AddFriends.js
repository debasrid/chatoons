import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export default class AddFriends extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentUserDetails: this.props.currentUserDetails,
            userid: '',
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            profile_picture: '',
            isFound: false,
            isAdded: false
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const userprofileapi = "http://localhost:5000/friends/search?searchcriteria=" + this.state.friendSearch;
        axios.get(userprofileapi)
        .then(response => {
            this.setState({
                userid: response.data._id,
                username: response.data.username,
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                profilepic: response.data.profile_picture,
                isFound: true
            })
        })
    }

    handleAddFriendFormSubmit = (event) => {
        event.preventDefault();
        const userid = this.state.currentUserDetails._id;
        const frienduserid = this.state.userid;
        const adduserapi = "http://localhost:5000/friends/addfriend";
        axios.post(adduserapi, { userid, frienduserid})
        .then(response => {
            this.setState({
                isAdded: true
            })
        })
    }
    
    render() {
        return (
            <div className="searchfriendbox" >
                <h2>Add Friend</h2>
                
                <form onSubmit={this.handleFormSubmit} id="friendsearchForm">
                <input type="text" name="friendSearch" value={this.state.friendSearch} placeholder="Search" id="search"  onChange={e => this.handleChange(e)}/>
                    <input type="submit" value="Search" id="search-submit" className="button-addfriend"/>                      
                </form>

                <form onSubmit={this.handleAddFriendFormSubmit} id="friendaddForm" >
                
                {this.state.isFound ? 
                    <div>
                        <p><img src={this.state.profilepic} width="50" height="50"></img></p>
                        <p><b>Name:</b>&nbsp;{this.state.firstname}&nbsp;{this.state.lastname}</p>
                        <p><b>Username:</b>&nbsp;{this.state.username}</p>
                        <p><b>Email:</b>&nbsp;{this.state.email}</p>
                        
                    </div>  : "No friend found"
                }
                {this.state.isAdded ? 
                    <div>
                        <p>Friend request sent!</p>
                    </div>  : ""
                }
                   <div>
                 <br/>
                <input type="submit" value="Add" id="Add-friend" className="button-signup"/>  
                </div>
                
                </form>
             </div>
             
        )
    }
}
