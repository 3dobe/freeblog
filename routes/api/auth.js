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
				res.cookie(
					'message',
					'Login success',
					{ httpOnly: false }
				);
			} else {
				req.session.user = null;
				res.cookie(
					'message',
					'Incorrect username or password',
					{ httpOnly: false }
				);
			}
			res.redirect('/admin');
		});
	});
	// logout
	app.post('/api/auth/logout', function (req, res) {
		req.session.user = null;
		res.cookie(
			'message',
			'Logout success',
			{ httpOnly: false }
		);
		res.redirect('/admin');
	});
};
