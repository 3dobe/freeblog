var async = require('async'),
	mongoose = require('mongoose'),
	config = require('../config'), User;

async.series([
	dropDatabase, addAdmin, addPosts, addAlbums
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

function addPosts(callback) {
	var Post = require('../models/post');
	async.eachSeries(
		config.posts,
		function (item, next) {
			var post = new Post(item);
			post.save(next);
		},
		function (err) {
			if (err) {
				callback(err);
			} else {
				console.log('posts inserted');
				callback(null);
			}
		}
	);
}

function addAlbums(callback) {
	var Album = require('../models/album');
	async.eachSeries(
		config.albums,
		function (item, next) {
			var album = new Album(item);
			album.save(next);
		},
		function (err) {
			if (err) {
				callback(err);
			} else {
				console.log('albums inserted');
				callback(null);
			}
		}
	);
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
