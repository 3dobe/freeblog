/**
 * Created by fritz on 1/4/14.
 */
module.exports = function (app) {
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
};
