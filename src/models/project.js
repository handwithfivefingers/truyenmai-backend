const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
      userAccess: [
            {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User',
            }
      ]
}, { timestamps: true });


module.exports = mongoose.model('Project', projectSchema)