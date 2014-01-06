var async = require('async'),
	User = require('../../models/user');

module.exports = function (app) {
	app.use(function (req, res, next) {
		// auth info
		async.waterfall([
			function (next) {
				if (!('userid' in req.session)) {
					next(new Error('No userid in session'));
				} else {
					User.findById(req.session['userid'], next);
				}
			}
		], function (err, user) {
			if (user) {
				req.user = user;
			}
			next();
		});
	});

	// login
	app.post('/api/auth/login', function (req, res) {
		async.waterfall([
			function (next) {
				var data = {
					username: req.body['username'],
					password: req.body['password']
				};
				if (!data['username'] || !data['password']) {
					next(new Error('Username and password requied'));
				} else {
					next(null, data);
				}
			},
			function (data, next) {
				data['password'] = User.encrypt(data['password']);
				User.findOne(data, next);
			}
		], function (err, user) {
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
