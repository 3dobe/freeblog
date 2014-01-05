var _ = require('underscore'),
	Album = require('../../models/album');

module.exports = function (app) {
	app.post('/api/albums', function (req, res) {
		if (!req.user) {
			res.cookie('message', 'Auth fail', { httpOnly: false });
			res.redirect('/albums');
		} else {
			var album = new Album(req.body);
			album.save(function (err) {
				var message;
				if (err) {
					message = err.message;
				} else {
					message = 'Album created';
				}
				res.cookie('message', message, { httpOnly: false });
				res.redirect('/albums/' + album.id);
			});
		}
	});

	app.put('/api/albums/:id', function (req, res) {
		if (!req.user) {
			res.cookie('message', 'Auth fail', { httpOnly: false });
			res.redirect('/albums');
		} else {
			var id = req.params['id'],
				message;
			Album.findByIdAndUpdate(id, {
				$set: req.body
			}, function (err, album) {
				if (!album) {
					message = 'Album not exists';
				} else {
					message = 'Album updated';
				}
				res.cookie('message', message, { httpOnly: false });
				res.redirect('/albums/' + album.id);
			});
		}
	});

	app.delete('/api/albums/:id', function (req, res) {
		if (!req.user) {
			res.cookie('message', 'Auth fail', { httpOnly: false });
			res.redirect('/albums');
		} else {
			var id = req.params['id'],
				message;
			Album.findByIdAndRemove(id, function (err, album) {
				if (!album) {
					message = 'Album not exists';
				} else {
					message = 'Album removed';
				}
				res.cookie('message', message, { httpOnly: false });
				res.redirect('/albums');
			});
		}
	});
};
