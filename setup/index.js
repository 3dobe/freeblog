var async = require('async'),
	mongoose = require('mongoose'),
	config = require('../config'), User;

async.series([
	dropDatabase, addAdmin
], done);

function addAdmin(callback) {
	User = require('../models/user');
	User.remove({}, function (err) {
		if (err) return callback(err);
		async.eachSeries(config.admin, function (item, next) {
			var admin = new User(item);
			admin.save(next);
		}, function (err) {
			if (err) {
				callback(err);
			} else {
				console.log('admin inserted');
				callback(null);
			}
		});
	});
}

function dropDatabase(callback) {
	mongoose.connect(config.mongo, function(err){
		if (err) {
			callback(err);
		} else {
			mongoose.connection.db.dropDatabase(function(err){
				// mongoose.disconnect();
				callback(err);
			});
		}
	});
}

function done(err) {
	if (err) throw err;
	process.exit();
}
