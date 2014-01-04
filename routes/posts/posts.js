var Post = require('../../models/post'),
	_ = require('underscore');

module.exports = function(app){
	//post list
	app.get('/posts',function(req, res){
		var postlist = null;
		Post.find({}, function(err, posts){
			if(posts){
				postlist = _.reduce(posts, function(memo, post){
					memo.push(post);
					return memo;
				},[]);
				return res.render('/posts', {
					postlist: postlist
				});
			} else {
				return res.render('/posts', {
					message: 'No post'
				})
			}
		});
	});

	//get post by id
	app.get('/posts/:id', function(req, res){
		var id = parseInt(req.params['id']),
			post = null;
		Post.findById(id, function(err, p){
			if(p){
				post = p;
				return res.render('/posts/:id', {
					post: post
				});
			} else {
				return res.render('/posts',{
					message: 'No such post'
				});
			}
		});
	});
};