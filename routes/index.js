module.exports = function (app) {
	require('./api')(app);
	require('./admin')(app);
	require('./posts')(app);

	// home page
	app.get('/', function (req, res) {
		res.render('home', {
			title: 'freeblog'
		});
	});
};
