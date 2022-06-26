const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types


const UserSchema = new mongoose.Schema({
  first_name: {
    type: String, 
    require: true
  },
  last_name: {
    type: String,
    require: true
  },
  email: {
    type: String, 
    require: true
  },
  password: {
    type: String,
    require: true
  },
  followers: [{
    type: ObjectId,
    ref: 'User'
  }],
  following: [{
    type: ObjectId,
    ref: 'User'
  }],
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema);