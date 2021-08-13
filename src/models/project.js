const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const projectSchema = new mongoose.Schema({
      name: {
            type: String,
            required: true,
            trim: true,
      },
      slug: {
            type: String,
            required: true,
            trim: true,
      },
      status: {
            type: String,
            required: true,
      },
      desc: {
            type: String,
            trim: true,
      },
      progress: {
            type: Number,
      },
      profilePicture: {
            type: String,
      },
      userOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
      },
}, { timestamps: true });

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

module.exports = mongoose.model('Project', projectSchema)