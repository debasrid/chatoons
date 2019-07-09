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
            <div >
                <form onSubmit={this.handleFormSubmit} id="chatForm">
                    <input type="submit" value="Chat now" className="messagenowbutton"/>
                </form>
                {this.state.isOpen ? 
                  <div>
                        <MessagesContainer threadid={this.state.threadid}/>
                        <MessageInput threadid={this.state.threadid} senderid={this.state.senderid} receiverid={this.state.receiverid} handleChange={this.handleChange}/>
                  </div>  : ""
                }
            </div>
        )
    }
}
