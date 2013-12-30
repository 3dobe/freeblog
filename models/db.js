var mongoose = require('mongoose'),
	config = require('../config'),
	db = mongoose.connection(config.mongo);
module.exports = db;