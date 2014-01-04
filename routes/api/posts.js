var Post = require('../../models/post'),
	_ = require('underscore');

module.exports = function(app){
	//add post
	app.post('/api/posts', function(req, res){
		var title = req.body['title'],
			body = req.body['body'],
			post = new Post(title, body),
			message,
			url;
		post.save(function(err, p) {
			if(err){
				message = err.message;
				url = '/admin';
			} else {
				message = 'Success';
				url = '/posts/' + p.id;
			}
		});
		res.cookie(
			'message',
			message,
			{ httpOnly: false }
		);
		res.redirect(url);
	});

	//delete post by id
	app.delete('/api/posts', function(req, res) {
		var id = parseInt(req.body['id']),
			url = '/admin',
			message;
		Post.findById(id, function(err, post) {
			if(err) {
				message = err.message;
			} else if (!post) {
				message = 'No such post';
			} else {
				post.remove();
				message = 'Post deleted';
			}
		});
		res.cookie(
			'message',
			message,
			{ httpOnly: false }
		);
		res.redirect(url);
	});

};