import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';


export default class AddFriends extends Component {
    render() {
        
        return (
            <div><h2>Add Friend</h2>
                <div>
                    <input type="text" placeholder="Search" id="search"/>
                    <input type="submit" value="Search" id="search-submit"/>  
                </div>
                <div>
                    {/* <img src={}/> */}
                    <Modal trigger={<Button>Add</Button>}></Modal>                    
                </div>
             </div>
        )
    }
}
