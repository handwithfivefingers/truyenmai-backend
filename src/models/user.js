const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  hash_password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  projectOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  contactNumber: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  request: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    }
  ]

}, { timestamps: true });

// Get FullName methods
userSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })

// Check password methods
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password)
  }
}

module.exports = mongoose.model('User', userSchema)