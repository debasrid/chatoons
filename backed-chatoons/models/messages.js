const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const messageSchema = new Schema({  

  messagethreadtimestamp: Date,
  messagethreadvisible: Boolean,
  messages:[{
    messagesender:  [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    messagereceiver:  [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    imageURL: String,
    emoticonURL: String,
    messagesent: Date
  }] 
});

const Message = mongoose.model('Messages', messageSchema);
module.exports = Message;
