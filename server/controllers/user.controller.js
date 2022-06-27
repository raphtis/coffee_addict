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

// Follow A USER
module.exports.follow = (req, res) => {
  User.findByIdAndUpdate(req.body.followId, {
    $push:{followers: req.user._id}
  },{
    new:true
  }, (err, result=> {
    if(err){
      return res.status(422).json({ error:err })
    }
    User.findByIdAndUpdate(req.user._id, {
      $push:{following: req.body.followId}
    }, {
      new:true
    })
    .then(result =>{
      res.json(result)
    }).catch(err=>{
      return res.json(422).json({ error:err })
    })
  }))
}

// UNFOLLOW A USER
module.exports.unfollow = (req, res) => {
  User.findByIdAndUpdate(req.body.unfollowId, {
    $pull:{followers: req.user._id}
  },{
    new:true
  }, (err, result=> {
    if(err){
      return res.status(422).json({ error:err })
    }
    User.findByIdAndUpdate(req.user._id, {
      $pull:{following: req.body.unfollowId}
    }, {
      new:true
    })
    .then(result =>{
      res.json(result)
    }).catch(err=>{
      return res.json(422).json({ error:err })
    })
  }))
}