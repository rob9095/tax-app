const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/tax-app', {
	keepAlive: true
});

module.exports.User = require('./user');
module.exports.Project = require('./project');
