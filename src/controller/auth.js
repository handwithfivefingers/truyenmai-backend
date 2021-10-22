const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');

// Register
exports.signup = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec(async (error, user) => {
      if (user) return res.status(400).json({
        message: 'Email đã được đăng kí, vui lòng đổi sang email khác !'
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
      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: 'Something went wrong',
            error
          });
        }
        if (data) {
          const token = jwt.sign({ _id: data._id, role: data.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_Expired })
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
            message: 'Tạo tài khoản thành công'
          })
        }
      })
    })
}

// Login
exports.signin = (req, res) => {
  // Check user in db
  User.findOne({
    email: req.body.email
  })
    .exec(async (error, user) => {
      // If have error
      if (error) return res.status(400).json({ error })
      // If have user
      if (user) {
        // If have user and user have authen password ( password method in UserSchema ) 
        let password = await user.authenticate(req.body.password);
        if (password) {
          // Generate Token
          const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_Expired })
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
            message: 'Sai mật khẩu, vui lòng thử lại sau !'
          })
        }
      }
      // Another solve
      else {
        return res.status(400).json({ message: 'Something went wrong' });
      }
    })
}

exports.signOut = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    message: 'Signout successfully !'
  })
}

//check Login 
exports.checkUser = (req, res) => {
  res.status(200).json({
    message: 'Login Successfully'
  })
}

// Search user
exports.findUser = async (req, res) => {
  // console.log(req.body.name)
  const name = new RegExp(req.body.name, 'i');
  // const { name } = req.body;
  const user = await User.find({
    "$or": [
      { firstName: name },
      { lastName: name },
      { email: name }
    ],
  },
  ).select('_id firstName lastName username email role ').exec();
  if (user) return res.status(200).json({
    user: user
  })
}
exports.addUsertoProject = async (req, res) => {
  let user = req.body.user.split(',');
  // user.map(item => {
  //   const newUser = User.find({ email: user })
  //   return Promise.all(newUser);
  // })
  // const response = await checkUser(user);
  checkUser(user)
    .then(res => {
      res.map(item => console.log(item[0]))
    })
    .finally(() => {
      console.log('done')
    })
  // if(response) console.log('check res', response)
  res.status(200).json({
    status: 'oke'
  })
}

checkUser = async (users) => { // Promise All
  let promise = users.map(email => {
    return User.find({ email: email.substring(1, email.length) })
      .select("_id role username").exec().then(res => res)
  })
  return Promise.all(promise);
}
