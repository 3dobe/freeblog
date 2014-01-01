module.exports = function (app) {
	// api routes
	require('./api')(app);

	// admin
	app.get('/admin', function (req, res) {
		if (req.session.user) {
			res.render('admin/dashboard', {
				title: 'Admin Dashboard',
				username: req.session.user
			});
		} else {
			res.render('admin/login', {
				title: 'Admin Login'
			});
		}
	});

	// home page
	app.get('/', function (req, res) {
		res.render('home', {
			title: 'freeblog'
		});
	});
};
