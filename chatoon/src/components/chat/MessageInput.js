import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
//import PhotosUploader from '../PhotosUploader';
import axios from 'axios';

export default class MessageInput extends Component {
    constructor(props){
        super(props);
        this.state = { 
            threadid: this.props.threadid,
            textmessage: "http://localhost:3000/chat/" + this.props.threadid + "/sendmessage" };
    }
     
    handleFormSubmit = (event) => {
      event.preventDefault();
      const textmessage = this.state.textmessage;
      const threadurl = "http://localhost:3000/chat/" + this.state.threadid + "/sendmessage";
      console.log("threadur: "+threadurl);
      axios.post(threadurl, { textmessage })
      .then( () => {
          this.setState({textmessage: ""});
      })
      .catch( error => console.log(error) )
    }
  
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
    }
    render() {
        const style = {
           
            color: "pink",
            height:"100px",
            border:'3 px solid grey'
        }
        return (
            <div style={style} >
                <form onSubmit={this.handleFormSubmit}>
                    <textarea name="textmessage" value={this.state.textmessage} onChange={ e => this.handleChange(e)}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
