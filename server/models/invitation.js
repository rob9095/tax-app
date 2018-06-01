const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  invitedByEmail: {
    type: String,
    required: true,
  }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;
