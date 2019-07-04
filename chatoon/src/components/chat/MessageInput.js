import React, { Component } from 'react'
//import { Button, Header, Image, Modal } from 'semantic-ui-react'
//import PhotosUploader from '../PhotosUploader';
//import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
//import Spinner from './Spinner'
//import Images from './Images'
//import Buttons from './Buttons'
import { API_URL } from '../../config/config';
import axios from 'axios';

export default class MessageInput extends Component {
    constructor(props){
        super(props);
        this.state = { 
            threadid: this.props.threadid,
            textmessage: `${API_URL}/chat/` + this.props.threadid + "/sendmessage", 
            imageFile: null
        }
        this.handleImageUpload = this.handleImageUpload.bind(this)
    }

    handleImageUpload(event) {
        this.setState({
            imageFile: URL.createObjectURL(event.target.files[0])    
        })
    }
      
    handleFormSubmit = (event) => {
      event.preventDefault();
      const textmessage = this.state.textmessage;
      const threadurl = `${API_URL}/chat/` + this.state.threadid + "/sendmessage";
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
            height:"120px",
            border:'3 px solid grey'
        }

       

        return (
            <div style={style} >
                <form onSubmit={this.handleFormSubmit}>
                    <div>
                        <input type="file" onChange={this.handleImageUpload}/>
                        <img width="50px" src={this.state.imageFile}/>
                    </div>
                    <textarea name="textmessage" value={this.props.textmessage} onChange={ e => this.props.handleChange(e)}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
