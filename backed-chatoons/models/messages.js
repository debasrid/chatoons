const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const messageSchema = new Schema({  

  messagethreadtimestamp: Date,
  messagethreadvisible: {type: Boolean, default: true},
  messengers:  [{ type : String }],
  messages:[{
    messagesender: String,
    messagereceiver:  String,
    textmessage: String,
    imagemessage: String,
    emoticonmessage: String,
    messagesent: Date
  }] 
});

const Message = mongoose.model('Messages', messageSchema);
module.exports = Message;
