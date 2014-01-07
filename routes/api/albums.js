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
				Album.findById(id, next);
			},
			function (album, next) {
				if (!album) {
					next(new Error('Album not exists'));
				} else {
					album.set(req.body);
					album.save(next);
				}
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
				Album.findById(id, next);
			},
			function (album, next) {
				if (!album) {
					next(new Error('Album not exists'));
				} else {
					album.remove(next);
				}
			}
		], function (err) {
			var message = err ? err.message : 'Album deleted';
			res.pushMessage(message);
			res.redirect('back');
		});
	});

	app.post('/api/albums/:id/pictures', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var id = req.params['id'];
				Album.findById(id, next);
			},
			function (album, next) {
				next(album ? null : new Error('Album not exists'), album);
			},
			function (album, next) {
				album.addPicture(req.body, req.files, next);
			}
		], function (err) {
			var message = err ? err.message : 'Picture published';
			res.pushMessage(message);
			res.redirect('back');
		});
	});
	app.put('/api/albums/:aid/pictures/:pid', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var albumId = req.params['aid'];
				Album.findById(albumId, next);
			},
			function (album, next) {
				next(album ? null : new Error('Album not exists'), album);
			},
			function (album, next) {
				var id = req.params['pid'];
				album.updatePicture(id, req.body, next);
			}
		], function (err) {
			var message = err ? err.message : 'Picture updated';
			res.pushMessage(message);
			res.redirect('back');
		});
	});
	app.delete('/api/albums/:aid/pictures/:pid', function (req, res) {
		async.waterfall([
			function (next) {
				next(req.user ? null : new Error('Auth fail'));
			},
			function (next) {
				var albumId = req.params['aid'];
				Album.findById(albumId, next);
			},
			function (album, next) {
				next(album ? null : new Error('Album not exists'), album);
			},
			function (album, next) {
				var id = req.params['pid'];
				album.removePicture(id, next);
			}
		], function (err) {
			var message = err ? err.message : 'Picture removed';
			res.pushMessage(message);
			res.redirect('back');
		});
	});
};
