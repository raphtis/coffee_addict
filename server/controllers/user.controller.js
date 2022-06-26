const User = require('../models/user.model')
const Post = require('../models/post.model')

// VIEW OTHER USERS PROFILE
module.exports.userProfiles = (req, res) => {
  User.findOne({ _id:req.params.id})
  .select('-password')
  .then(user => {
    Post.find({postedBy:req.params.id})
      .populate('postedBy', '_id first_name last_name')
      .exec((err, posts) => {
        if(err){
          return res.status(422).json({ error:err })
        }
        res.json({ user, posts })
      })
  }).catch(err => {
    return res.status(404).json({ error: 'User not found.'})
  })
}