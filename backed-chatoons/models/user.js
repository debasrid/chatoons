const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  profile_picture:[{ type:String }],
  imageUrl: { type: String},
  message: [],
  friends: [{
    frienduserid: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    friendrequestid: [ { type : Schema.Types.ObjectId, ref: 'Requests' } ]
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
