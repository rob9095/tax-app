const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  teamwork_id: {
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
	}
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
