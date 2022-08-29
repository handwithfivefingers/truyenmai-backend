const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const tasksSchema = new mongoose.Schema(
	{
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		desc: {
			type: String,
			trim: true,
		},
		issue: {
			type: String,
			trim: true,
		},
		progress: {
			type: Number,
			required: true,
		},
		status: {
			type: Number,
			required: true,
		},
		profilePicture: {
			type: String,
		},
		delete: {
			type: Number,
			enum: [0, 1],
			default: 0,
		},
	},
	{ timestamps: true }
);

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

module.exports = mongoose.model('Tasks', tasksSchema);
