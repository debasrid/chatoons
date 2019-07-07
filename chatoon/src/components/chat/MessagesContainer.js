import React, { Component } from 'react'
import axios from 'axios';
import { API_URL } from '../../config/config'

export default class MessagesContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            threadId: this.props.threadid,
            messages: []
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
    render() {

        const style = {
            paddingLeft: "50px",
            paddingTop: "50px",
            backgroundColor: "pink",
            color: "white",
            height:"300px"
        }
        var messageList = this.state.messages.map(function(message){
            var imageContent = '';
            var messageContent = '';
            if(message.imagemessage!=null) {
                imageContent = message.imagemessage;
            }
            if(message.emoticonmessage!=null) {
                imageContent = message.emoticonmessage;
            }
            if(imageContent!='') {
                messageContent = <div><p>{message.messagesender} :&nbsp;&nbsp;<img src={imageContent} width="50" height="50"></img></p></div>;
            }
            if(message.textmessage!=null) {
                messageContent = <div><p>{message.messagesender} :&nbsp;&nbsp;{message.textmessage}</p></div>;
            }

            return  messageContent;
        })
        return (
            <div>
              <div style={style} > 
              <div>{ messageList }</div>               
                  
              </div>

            </div>
        )
    }
}
