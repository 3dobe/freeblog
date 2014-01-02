var User = require('../../models/user');

module.exports = function (app) {
	// login
	app.post('/api/auth/login', function (req, res) {
		User.findOne({
			username: req.body['username'],
			password: User.encrypt(req.body['password'])
		}, function(err, user){
			if (user) {
				req.session.user = user.username;
				res.redirect('/admin');
			} else {
				req.session.user = null;
				res.render('message', {
					title: 'Auth Fail',
					message: 'Incorrect username or password.'
				});
			}
		});
	});
	// logout
	app.post('/api/auth/logout', function (req, res) {
		req.session.user = null;
		res.redirect('/admin');
	});
}
