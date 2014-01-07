var Post = require('../models/post'),
	_ = require('underscore');

module.exports = function (app) {
	//post list
	app.get('/posts', function (req, res) {
		Post.find({}, function (err, posts) {
			res.render('posts/list', {
				title: 'Posts',
				posts: posts
			});
		});
	});

	//get post by id
	app.get('/posts/:id', function (req, res) {
		var id = req.params['id'];
		Post.findById(id, function (err, post) {
			if (!post){
				res.pushMessage('Post not exists');
				res.redirect('/posts');
			} else {
				res.render('posts/post', {
					title: post.title,
					post: post
				});
			}
		});
	});
};