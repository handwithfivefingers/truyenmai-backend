const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const tasksSchema = new mongoose.Schema({
  project: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Project', 
      required: true
  },
  name: {
      type: String,
      required: true,
      trim: true,
  },
  desc: {
      type:String,
      trim:true,
  },
  status : {
      type: Number,
      required: true,
  },
  profilePicture: {
    type: String,
  },

}, {timestamps:true});

// // Get FullName methods
// userSchema.virtual('fullName')
// .get(function() {
//   return `${this.firstName} ${this.lastName}`;
// })

// // Check password methods
// userSchema.methods = {
//   authenticate: async function(password) {
//     return await bcrypt.compare(password, this.hash_password)
//   }
// }

module.exports = mongoose.model('Tasks', tasksSchema)