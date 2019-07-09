import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import MessagesContainer from './MessagesContainer'
import MessageInput from './MessageInput'
import axios from 'axios'
import { API_URL } from '../../config/config'

export default class MessageBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            chatrequest: null,
            chatIntervalId: '',
            isOpen: false
        }
    }

    componentDidMount() {
        var threadurl = "http://localhost:5000/chat/chatrequests/"+this.props.currentUserDetails.username;
        const chatRefreshId = setInterval(() => {
            axios.get(threadurl)
            .then(response => {
                    this.setState({
                        chatrequest: response.data
                    });
            })
        }, 5000);
        this.setState({chatIntervalId: chatRefreshId});
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    handleChatReqFormSubmit = (event) => {
        clearInterval(this.state.chatIntervalId);
        this.setState({
            chatIntervalId: '',
            isOpen: true
        });
    }

    render() {
        return (
            <div >
                <h2>My Chat Requests</h2> 
                {(this.state.chatrequest !=null && this.state.chatrequest.length != 0) ? 
                <div>
                    <p>Chat request from {this.state.chatrequest[0].messengers[0]}!</p>
                    <Button onClick={this.handleChatReqFormSubmit}>Start Chatting</Button>
                </div> : "No chat request"
                } 
                {this.state.isOpen ? 
                    <div>
                            <MessagesContainer threadid={this.state.chatrequest[0]._id}/>
                            <MessageInput threadid={this.state.chatrequest[0]._id} senderid={this.state.chatrequest[0].messengers[0]} receiverid={this.state.chatrequest[0].messengers[0]} handleChange={this.handleChange}/>
                    </div>  : ""
                }
            </div>
        )
    }
}