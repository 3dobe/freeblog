var _ = require('underscore'),
	async = require('async'),
	Album = require('../../models/album');

module.exports = function (app) {
	app.post('/api/albums', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var album = new Album(req.body);
				album.save(next);
			}
		], function (err) {
			var message = err ? err.message : 'Album created';
			res.pushMessage(message);
			res.redirect('back');
		});
	});

	app.put('/api/albums/:id', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var id = req.params['id'];
				Album.findByIdAndUpdate(id, { $set: req.body }, next);
			},
			function (album, next) {
				next(album ? null : new Error('Album not exists'));
			}
		], function (err) {
			var message = err ? err.message : 'Album updated';
			res.pushMessage(message);
			res.redirect('back');
		});
	});

	app.delete('/api/albums/:id', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var id = req.params['id'];
				Album.findByIdAndRemove(id, next);
			},
			function (album, next) {
				next(album ? null : new Error('Album not exists'));
			}
		], function (err) {
			var message = err ? err.message : 'Album deleted';
			res.pushMessage(message);
			res.redirect('back');
		});
	});
};
