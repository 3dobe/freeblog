var Post = require('../../models/post'),
	async = require('async'),
	_ = require('underscore');

module.exports = function (app) {
	//add post
	app.post('/api/posts', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var post = new Post(req.body);
				post.save(next);
			}
		], function (err) {
			var message = err ? err.message : 'Post created';
			res.pushMessage(message);
			res.redirect('back');
		});
	});

	//update post by id
	app.put('/api/posts/:id', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var id = req.params['id'];
				Post.findByIdAndUpdate(id, { $set: req.body }, next);
			},
			function (post, next) {
				next(post ? null : new Error('Post not exists'));
			}
		], function (err) {
			var message = err ? err.message : 'Post updated';
			res.pushMessage(message);
			res.redirect('back');
		});
	});

	//delete post by id
	app.delete('/api/posts/:id', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var id = req.params['id'];
				Post.findByIdAndRemove(id, next);
			},
			function (post, next) {
				next(post ? null : new Error('Post not exists'));
			}
		], function (err) {
			var message = err ? err.message : 'Post deleted';
			res.pushMessage(message);
			res.redirect('back');
		});
	});

	//add comment
	app.post('/api/posts/:id/comments', function (req, res) {
		async.waterfall([
			function (next) {
				var id = req.params['id'];
				Post.findById(id, next);
			},
			function (post, next) {
				next(post ? null : new Error('Post not exists'), post);
			},
			function (post, next) {
				post.addComment(req.body, next);
			}
		], function (err) {
			var message = err ? err.message : 'Comment created';
			res.pushMessage(message);
			res.redirect('back');
		});
	});

	//delete comment
	app.delete('/api/posts/:pid/comments/:cid', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var pid = req.params['pid'];
				Post.findById(pid, next);
			},
			function (post, next) {
				next(post ? null : new Error('Post not exists'), post);
			},
			function (post, next) {
				var cid = req.params['cid'];
				post.deleteComment(cid, next);
			}
		], function (err) {
			var message = err ? err.message : 'Comment deleted';
			res.pushMessage(message);
			res.redirect('back');
		});
	});
};