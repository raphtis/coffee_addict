const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const PostSchema = new mongoose.Schema({
  title: {
    type: String, 
    require: true
  },
  brand: {
    type: String,
    require: true
  },
  blend: {
    type: String,
    require: true
  },
  photo: {
    type: String,
  },
  likes: [{
    type: ObjectId,
    ref: 'User'
  }],
  comments: [{
    text: String,
    postedBy: {
      type: ObjectId,
      ref: 'User'
    }
  }],
  postedBy: {
    type: ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Post', PostSchema)