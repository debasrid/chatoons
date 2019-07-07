import React, { Component } from 'react'
import {Image, Transformation} from 'cloudinary-react';
import { API_URL } from '../../config/config';
import axios from 'axios';

export default class MessageInput extends Component {
    constructor(props){
        super(props);
        this.state = { 
            threadid: this.props.threadid,
            threadurl: `${API_URL}/chat/` + this.props.threadid + "/sendmessage",
            senderid: this.props.senderid,
            receiverid: this.props.receiverid,
            textmessage: '', 
            imageFilePath: '',
            imageFile: null
        }
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleImageUpload(event) {
        this.setState({          
            imageFilePath: URL.createObjectURL(event.target.files[0]),
            imageFile: event.target.files[0]      
        })
    }

      
    handleFormSubmit = (event) => { 
        event.preventDefault();
        var form_data = new FormData();
        form_data.append('messagesender', this.state.senderid);
        form_data.append('messagereceiver', this.state.receiverid);
        if(this.state.imageFile!=null) form_data.append('imageFile', this.state.imageFile, this.state.imageFile.name);
        if(this.state.textmessage!='') form_data.append('textmessage', this.state.textmessage);
        
        axios.post(this.state.threadurl, form_data, {
            headers: {
            'content-type': 'multipart/form-data'
            }
        })
        .then(body => { 
            this.setState({
                textmessage: '', 
                imageFilePath: '',
                imageFile: null
            });
            console.log('Upload successful!  Server responded with:', body);
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
                        <input type="file" id="image" accept="image/png, image/jpeg" onChange={this.handleImageUpload}/>
                        <br></br>
                        <img width="50px" name="imagemessage" src={this.state.imageFilePath}/><br></br> 
                    </div>
                    <textarea name="textmessage" value={this.state.textmessage} onChange={ e => this.handleChange(e)}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}
