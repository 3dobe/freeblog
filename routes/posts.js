var Post = require('../models/post'),
	async = require('async'),
	_ = require('underscore');

module.exports = function (app) {
	//post list
	app.get('/posts', function (req, res) {
		async.waterfall([
			function (next) {
				Post.find({}, next);
			},
			function (posts, next) {
				next(posts ? null : new Error('No post'), posts);
			},
			function (posts, next) {
				var postlist = _.reduce(posts, function (memo, post) {
					memo.push(post);
					return memo;
				}, []);
				next(null, postlist);
			}
		], function (err, postlist) {
			if (err) {
				var message = err.message;
				res.render('/posts', { message: message });
			} else {
				res.render('/posts', { postlist: postlist });
			}
		});
	});

	//get post by id
	app.get('/posts/:id', function (req, res) {
		var id = req.params['id'];
		async.waterfall([
			function (next) {
				Post.findById(id, next);
			},
			function (post, next) {
				next(post ? null : new Error('Post not exists'), post);
			}
		], function (err, post) {
			if (err) {
				var message = err.message;
				render('/posts', { message: message });
			} else {
				render('/posts/' + id, { post: post });
			}
		});
	});
};