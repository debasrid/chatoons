const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const friendrequestSchema = new Schema({  
    sender:  [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    receiver:  [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    status: {type: String, enum: ['ACCEPTED', 'DECLINED', 'PENDING'], default: 'PENDING'},
    sent_on: Date
})

const Requests = mongoose.model('requests', friendrequestSchema);
module.exports = Requests;