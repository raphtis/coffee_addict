const Post = require('../models/post.model')
const User = require('../models/user.model')



// GET ALL POSTS WITH POSTED BY USERNAME AND ID
module.exports.getAll = (req, res) => {
  Post.find()
  // POPULATE INFO FROM USER WHO MADE POST
    .populate('postedBy', '_id first_name last_name')
    .populate('comments.postedBy', '_id first_name last_name')
    .then(posts => {
      res.json({ posts })
    })
    .catch((err) => console.log(err))
}

// POSTS CREATED BY ONE USER
module.exports.myPosts = (req, res) => {
  Post.find({ postedBy: req.user._id })
  .populate('postedBy', '_id first_name last_name')
  .then(myPosts => {
    res.json({ myPosts })
  })
  .catch((err) => console.log(err))
}


// CREATE POST WITH SERVER VALIDATION 
module.exports.createPost = (req, res) => {
  const { title, brand, blend, pic } = req.body
  if(!title || !brand || !blend){
    return res.status(422).json({ error: 'Please add all fields.'})
  }
  req.user.password = undefined
  const post = new Post({
    title,
    brand,
    blend,
    photo:pic,
    postedBy: req.user
  })
  post.save()
    .then(result => {
      res.json({ post:result })
    })
    .catch((err) => console.log(err))
}