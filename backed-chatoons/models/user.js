const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  profile_picture: [{ type: String}],
  message: [],
  friendrequestsreceived: [{
    frienduserid: { type : Schema.Types.ObjectId, ref: 'User' },
    friendrequeststatus: {type: String, enum: ['ACCEPTED', 'DECLINED', 'PENDING'], default: 'PENDING'},
    friendrequestSentOn: Date,
    friendrequestRespondedOn: Date
  }],
  friendrequestssent: [{
    frienduserid: { type : Schema.Types.ObjectId, ref: 'User' },
    friendrequeststatus: {type: String, enum: ['ACCEPTED', 'DECLINED', 'PENDING'], default: 'PENDING'},
    friendrequestSentOn: Date,
    friendrequestRespondedOn: Date
  }],
  friends: [{
    frienduserid: { type : Schema.Types.ObjectId, ref: 'User' },
    friendfirstname: { type : String },
    friendlastname: { type : String },
    friendimageUrl: { type : String }
  }],
  role:{type: String, enum: ['USER', 'ADMIN'], default: 'USER'}
}, {
  timestamps: { 
   createdAt: 'created_at',
   updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
