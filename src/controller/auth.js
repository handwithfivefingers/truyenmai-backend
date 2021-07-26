const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

// Register
exports.signup = ( req,res) => {
User.findOne({
  email: req.body.email
})
.exec( async (error, user) => {
  if(user) return res.status(400).json({
    message: 'User already registerd'
  })
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;
 
  const hash_password = await bcrypt.hash(password, 10);
  const _user = new User({
    firstName,
    lastName,
    email,
    hash_password,
    username: shortid.generate(),
  })
  _user.save((error,data) => {
    if(error) {
      return res.status(400).json({
        message: 'Something went wrong'
      });
    }
    if(data) {
      const token = jwt.sign({ _id: data._id,role: data.role}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_Expired})
      const { _id, firstName, lastName, email, role, fullName } = data;
      // return source
      return res.status(201).json({
        token,
        user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName
        },
        message: 'User created successfully'
      })
    }
  })
})
}

// Login
exports.signin = (req,res) => {
  // Check user in db
  User.findOne({
    email: req.body.email
  })
  .exec( async (error, user) => {

    // If have error
    if(error) return res.status(400).json({error})

    // If have user
    if(user) {

      // If have user and user have authen password ( password method in UserSchema ) 
      if(user.authenticate(req.body.password)) {

        // Generate Token
        const token = jwt.sign({ _id: user._id,role: user.role}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_Expired})
        const { _id, firstName, lastName, email, role, fullName } = user;
        // return source
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName
          }
        });
      }
      // If authen password wrong
      else {
        return res.status(400).json({
          message: 'Invalid password'
        })
      }
    } 
    // Another solve
    else {
      return res.status(400).json({message: 'Something went wrong'});
    }
  })
}