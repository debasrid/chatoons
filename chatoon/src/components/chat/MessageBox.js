import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import MessagesContainer from './MessagesContainer'
import MessageInput from './MessageInput'
import axios from 'axios'
import { API_URL } from './config'

export default class MessageBox extends Component {
    state={
        senderid: "5d0c0aca602bbd448c9d4ee5",
        receiverid: "5d0c0ace602bbd448c9d4ee6",
        threadid: '',
        messages: []
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const senderid = this.state.senderid;
        const receiverid = this.state.receiverid;
        axios.post(`${API_URL}/chat/startchat`, { senderid,  receiverid})
        .then( response => {
            this.setState({threadid: response._id});
            console.log(response);
        })
        .catch( error => console.log(error) )
      }
    render() {
        return (
            <div className="messageBox">
                <form onSubmit={this.handleFormSubmit}>
                    <Modal trigger={<Button>Chat Now</Button>}>
                        <MessagesContainer/>
                        <MessageInput threadid={this.state.threadid} />
                    </Modal>
                </form>
            </div>
        )
    }
}
