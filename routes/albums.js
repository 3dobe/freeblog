/**
 * Created by fritz on 1/7/14.
 */
var async = require('async'),
	Album = require('../models/album');

module.exports = function (app) {
	app.get('/albums/:aid/pictures/:pid/image', function (req, res) {
		async.waterfall([
			function (next) {
				var albumId = req.params['aid'];
				Album.findById(albumId, next);
			},
			function (album, next) {
				next(album ? null : new Error('Album not exists'), album);
			},
			function (album, next) {
				var id = req.params['pid'];
				album.getPicturePath(id, next);
			}
		], function (err, picturePath) {
			if (err) {
				res.send(404);
			} else {
				res.sendfile(picturePath);
			}
		});
	});
};
