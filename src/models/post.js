const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
 title: {
   type: String,
   required: true,
   trim:true,
 },
 slug: {
  type: String,
  required: true,
  unique: true,
  },
  excerpt: {
    type: String,
    trim:true,
  },
  content: {
    type: String,
    trim:true,
  },
  status: {
    required:true,
    type:String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true
  },
  tags : {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tags', 
    required: true
  },

  type: {
      type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
  },
  postImage:[
    { img: { type: String } }
  ]
}, {timestamps:true});


module.exports = mongoose.model('Post', postSchema)