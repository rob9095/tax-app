const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
    unique: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  clientKey: {
    type: String,
    required: true,
  },
  clientSecret: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Number,
    required: true,
  },
});

const AccessToken = mongoose.model('AccessToken', accessTokenSchema);

module.exports = AccessToken;
