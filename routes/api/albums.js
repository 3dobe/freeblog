var _ = require('underscore'),
	Album = require('../../models/album');

module.exports = function (app) {
	app.post('/api/albums', function (req, res) {
		var album = new Album(req.body);
		album.save(function (err) {
			var message;
			if (err) {
				message = err.message;
			} else {
				message = 'Album created';
			}
			res.cookie('message', message, { httpOnly: false });
			res.redirect('/albums');
		});
	});
};
