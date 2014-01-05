/**
 * Created by fritz on 1/4/14.
 */
module.exports = function (app) {
	// admin
	app.get('/admin', function (req, res) {
		if (!req.user) {
			res.render('admin/login', {
				title: 'Admin Login'
			});
		} else {
			res.render('admin/dashboard', {
				title: 'Admin Dashboard',
				username: req.user.username
			});
		}
	});
};
