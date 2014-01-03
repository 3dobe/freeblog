var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment'),
	config = require('../config'),
	conn = mongoose.connect(config.mongo);

autoIncrement.initialize(conn);
module.exports = conn;
