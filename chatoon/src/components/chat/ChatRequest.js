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
            senderid: "Debasri",
            receiverid: this.props.friendusername,
            threadid: '',
            response: '',
            messages: [],
            isOpen: false,
            textMessage: ""
        }
    }

    componentDidMount() {
        var threadurl = "http://localhost:5000/chat/"+this.state.threadId;
        const chatRefreshId = setInterval(() => {
            axios.get(threadurl)
            .then(response => {
                if(response.data.messagethreadvisible){
                    
                    this.setState({
                        threadId: response.data._id,
                        messages: response.data.messages
                    });
                } else {
                    this.state = {
                        threadId: this.props.threadid,
                        messages: []
                    }
                }
            })
        }, 3000);
        // after 60 seconds stop refresh
        setTimeout(() => { 
            clearInterval(chatRefreshId); 
            this.state = {
                threadId: this.props.threadid,
                messages: [{textmessage: 'Chat closed'}]
            }
        }, 60000);
    }

    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const senderid = this.state.senderid;
        const receiverid = this.state.receiverid;
        axios.post(`${API_URL}/chat/startchat`, { senderid,  receiverid})
        .then( result => {
            this.setState({threadid: result.data._id});
            this.setState({isOpen: true});
        })
        .catch( error => console.log(error) )
      }
    render() {
        return (
            <div className="messageBox">
                <h2>My Chat Requests</h2> 
                <form onSubmit={this.handleFormSubmit} id="chatForm">
                    <Button>Chat Request</Button>
                </form>
                {this.state.isOpen ? 
                  <div>
                        <MessagesContainer threadid={this.state.threadid}/>
                        <MessageInput threadid={this.state.threadid} senderid={this.state.senderid} receiverid={this.state.receiverid} handleChange={this.handleChange}/>
                  </div>  : "chat closed"
                }
            </div>
        )
    }
}
