const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET



// HEALTHCHECK
module.exports.healthCheck = (req, res) => {
  res.send('Ready for some caffeine!')
}

// TEST PROTECTED ROUTE
module.exports.protected = (req, res) => {
  res.send('Protected route.')
}


// SIGNUP
module.exports.signup = (req, res) => {
  const { first_name, last_name, email, password, pic } = req.body
  if(!email || !password || !first_name || !last_name){
    return res.json({ error: 'Please add all fields.'})
  }
  // CHECK IF USER EXISTS WITH EMAIL ADDRESS IN DB
  User.findOne({email:email})
    .then((savedUser) => {
      if(savedUser){
        return res.status(422).json({ error: 'User already exists with that email.'})
      }
      // HASH PASSWORD
      bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email, 
            password:hashedPassword,
            first_name,
            last_name, 
            photo:pic
          })
          user.save()
            .then(user => {
              res.json({ message: 'Account created successfully!'})
            })
            .catch((err) =>{
              console.log(err)
            })
        })
    })
    .catch((err) => {
      console.log(err)
    })
}


// LOGIN
module.exports.login = (req, res) => {
  // INPUT VALIDATION 
  const { email, password } = req.body
  if(!email || !password){
    return res.status(422).json({ error: 'Email or password are missing.'})
  }
  // FIND USER IN DB
  User.findOne({ email:email })
    .then(savedUser => {
      if(!savedUser){
        return res.status(422).json({ error: 'Invalid email or password!'})
      }
      bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
          if(doMatch){
            // GENERATE JWT TOKEN ON LOGIN
            const token = jwt.sign({ _id:savedUser._id}, JWT_SECRET)
            const { _id, first_name, last_name, email, followers, following, photo } = savedUser
            res.json({ token, user:{_id, first_name, last_name, email, followers, following, photo}})
          }else{
            return res.status(422).json({ error: 'Invalid email or password!'})
          }
        })
        .catch((err) => console.log(err))
    })
}