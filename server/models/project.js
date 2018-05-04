const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const projectSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
	name: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	category: {
		type: mongoose.Schema.Types.Mixed
	}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
