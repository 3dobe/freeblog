var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment'),
	config = require('../config'),
	conn = mongoose.connect(config.mongo);

// https://stackoverflow.com/questions/48607918/mongoerror-unknown-modifier-pushall-in-node-js
mongoose.plugin(schema => { schema.options.usePushEach = true });

autoIncrement.initialize(conn);
module.exports = conn;
