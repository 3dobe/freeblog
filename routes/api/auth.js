var User = require('../../models/user');

module.exports = function (app) {
	// auth info
	app.all(/^\/api\//, function (req, res, next) {
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
		var message;
		User.findOne({
			username: req.body['username'],
			password: User.encrypt(req.body['password'])
		}, function (err, user) {
			if (user) {
				req.session['userid'] = user._id;
				message = 'Login success';
			} else {
				delete req.session['userid'];
				message = 'Login fail';
			}
			res.cookie('message', message, { httpOnly: false });
			res.redirect('/admin');
		});
	});

	// logout
	app.post('/api/auth/logout', function (req, res) {
		delete req.session['userid'];
		res.cookie('message', 'Logout success', { httpOnly: false });
		res.redirect('/admin');
	});
};
