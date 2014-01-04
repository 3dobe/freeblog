module.exports = function (app) {
	require('./api')(app);
	require('./posts')(app);
	require('./admin')(app);

	// home page
	app.get('/', function (req, res) {
		res.render('home', {
			title: 'freeblog'
		});
	});
};
