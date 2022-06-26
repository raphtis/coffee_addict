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
  const { title, brand, blend, description, pic } = req.body
  if(!title || !brand || !blend){
    return res.status(422).json({ error: 'Please add all fields.'})
  }
  req.user.password = undefined
  const post = new Post({
    title,
    brand,
    blend,
    description,
    photo:pic,
    postedBy: req.user
  })
  post.save()
    .then(result => {
      res.json({ post:result })
    })
    .catch((err) => console.log(err))
}

// DELETE POST
module.exports.deletePost = (req, res) => {
  Post.findOne({ _id:req.params.postId })
  .populate('postedBy', '_id')
  .exec((err, post) => {
    if(err || !post){
      return res.status(422).json({ error:err })
    }
    if(post.postedBy._id.toString() === req.user._id.toString()){
      post.remove()
      .then(result => {
        res.json(result)
      }).catch((err) => console.log(err))
    }
  })
}

// LIKE POST
module.exports.like = (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {
    $push:{likes:req.user._id}
  },{
    new:true
  })
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id first_name last_name')
  .exec((err, result) => {
    if(err){
      return res.status(422).json({ error:err })
    }else{
      res.json(result)
    }
  })
}

// UNLIKE POST
module.exports.unlike = (req, res) => {
  Post.findByIdAndUpdate(req.body.postId, {
    $pull:{likes:req.user._id}
  },{
    new:true
  })
  .populate('comments.postedBy', '_id name')
  .populate('postedBy', '_id first_name last_name')
  .exec((err, result) => {
    if(err){
      return res.status(422).json({ error:err })
    }else{
      res.json(result)
    }
  })
}

// COMMENT ON POST
module.exports.comment = (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id
  }

  Post.findByIdAndUpdate(req.body.postId, {
    $push:{comments:comment}
  }, {
    new:true
  })
  .populate('comments.postedBy', '_id first_name last_name')
  .populate('postedBy', '_id first_name last_name')
  .exec((err, result) => {
    if(err){
      return res.status(422).json({ error:err })
    }else{
      res.json(result)
    }
  })
}


// DELETE COMMENT
module.exports.deleteComment = (req, res) => {
  Post.findById(req.params.postId)
  .populate('comments.postedBy', '_id first_name last_name')
  .exec((err, post) => {
    if(err || !post){
      return res.status(422).json({ message: 'Error occurred!'});
    }
    const comment = post.comments.find((comment) => comment._id.toString() === req.params.commentId.toString());
    if(comment.postedBy._id.toString() === req.user._id.toString()){
      const removeIndex = post.comments
      .map(comment => comment._id.toString())
      .indexOf(req.params.commentId);
      post.comments.splice(removeIndex, 1);
      post.save()
      .then(result => {
        res.json(result)
      }).catch(err => console.log(err));
    }
  })
}