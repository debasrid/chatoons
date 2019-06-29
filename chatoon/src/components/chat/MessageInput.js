import React, { Component } from 'react'
//import { Button, Header, Image, Modal } from 'semantic-ui-react'
//import PhotosUploader from '../PhotosUploader';
//import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';
import Spinner from './Spinner'
import Images from './Images'
import Buttons from './Buttons'
import { API_URL } from './config'
import axios from 'axios';

export default class MessageInput extends Component {
    constructor(props){
        super(props);
        this.state = { 
            threadid: this.props.threadid,
            textmessage: `${API_URL}/chat/` + this.props.threadid + "/sendmessage", 
            uploading: false,
            images: []
        }
    }

    onChange = e => {
        const files = Array.from(e.target.files)
        this.setState({ uploading: true })
    
        const formData = new FormData()
    
        files.forEach((file, i) => {
          formData.append(i, file)
        })
    
        fetch(`${API_URL}/content/image-upload`, {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(images => {
          this.setState({ 
            uploading: false,
            images
          })
        })
      }

    removeImage = id => {
    this.setState({
        images: this.state.images.filter(image => image.public_id !== id)
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
            height:"100px",
            border:'3 px solid grey'
        }
        const { uploading, images } = this.state

        const content = () => {
            switch(true) {
                case uploading:
                return <Spinner />
                case images.length > 0:
                return <Images images={images} removeImage={this.removeImage} />
                default:
                return <Buttons onChange={this.onChange} />
            }
        }

        return (
            <div style={style} >
                <form onSubmit={this.handleFormSubmit}>
                <div className='buttons'>
                    {content()}
                </div>
                    <textarea name="textmessage" value={this.state.textmessage} onChange={ e => this.handleChange(e)}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
