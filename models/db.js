var mongoose = require('mongoose'),
	config = require('../config'),
	conn = mongoose.connect(config.mongo);
autoIncrement.initialize(conn);
module.exports = conn;
