var User = require('../../models/user');

module.exports = function (app) {
	app.use(function (req, res, next) {
		// auth info
		req.user = null;
		if (!('userid' in req.session)) {
			next();
		} else {
			User.findById(req.session['userid'], function (err, user) {
				if (user) {
					req.user = user;
				}
				next();
			});
		}
	});

	// login
	app.post('/api/auth/login', function (req, res) {
		User.findOne({
			username: req.body['username'],
			password: User.encrypt(req.body['password'])
		}, function (err, user) {
			if (!user) {
				delete req.session['userid'];
				res.pushMessage('Login fail');
				res.redirect('back');
			} else {
				req.session['userid'] = user._id;
				res.pushMessage('Login success');
				res.redirect('/admin');
			}
		});
	});

	// logout
	app.post('/api/auth/logout', function (req, res) {
		delete req.session['userid'];
		res.pushMessage('Logout success');
		res.redirect('/admin');
	});
};
