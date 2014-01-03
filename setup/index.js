var async = require('async'),
	User = require('../models/user'),
	config = require('../config');

addAdmin();

function addAdmin() {
	User.remove({}, function () {
		async.eachSeries(config.admin, function (item, next) {
			var admin = new User(item);
			admin.save(next);
		}, function (err) {
			if (err) throw err;
			console.log('admin inserted');
			done();
		});
	});
}

function done() {
	process.exit();
}
