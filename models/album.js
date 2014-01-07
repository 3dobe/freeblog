var path = require('path'),
	fs = require('fs'),
	_ = require('underscore'),
	async = require('async'),
	uuid = require('node-uuid').v4,
	autoIncrement = require('mongoose-auto-increment'),
	db = require('./db'),
	Schema = db.Schema,
	config = require('../config'),
	albumDir = config.albumDir,
	pictureLimit = config.pictureLimit,
	PictureSchema, AlbumSchema, Album;

PictureSchema = new Schema({
	_id: { type: String, required: true },
	ext: { type: String, required: true },
	desc: { type: String, default: '' },
	date: { type: Date, default: Date.now }
});

AlbumSchema = new Schema({
	title: { type: String, default: '' },
	pictures: [PictureSchema],
	date: { type: Date, default: Date.now }
}, { _id: false });
AlbumSchema.plugin(autoIncrement.plugin, {
	model: 'Album',
	field: '_id',
	startAt: 1
});

AlbumSchema.pre('save', function (next) {
	if (this.isNew) {
		// create album diretory
		fs.mkdir(this.getAlbumPath(), next);
	} else {
		next();
	}
});
AlbumSchema.pre('remove', function (next) {
	// delete album diretory
	var albumPath = this.getAlbumPath();
	try {
		var files = fs.readdirSync(albumPath);
		files.forEach(function (file) {
			fs.unlinkSync(path.join(albumPath, file));
		});
		fs.rmdir(albumPath, next);
	} catch (err) {
		next(err);
	}
});

AlbumSchema.methods.getAlbumPath = function () {
	return path.join(albumDir, '' + this._id);
};
AlbumSchema.methods.getPicturePath = function (picture) {
	if (_.isString(picture)) {	// if id is given
		var pictureId = picture;
		picture = _.findWhere(this.pictures, { _id: pictureId });
	}
	var albumPath = this.getAlbumPath(),
		filename = picture._id + picture.ext;
	return path.join(albumPath, filename);
};

AlbumSchema.methods.addPicture = function (picture, files, callback) {
	var self = this;
	async.waterfall([
		function (next) {
			var file = files['image'];
			if (!file) {
				next(new Error('No image input'));
			} else if (!/^image\//.test(file.type)) {
				next(new Error('Not type of image'));
			} else if (file.size > pictureLimit) {
				next(new Error('Image too large'));
			} else {
				next(null, file);
			}
		},
		function (file, next) {
			var id = uuid(),
				extname = path.extname(file.name),
				filename = self.getPicturePath({ _id: id, ext: extname });
			fs.rename(file.path, filename, function (err) {
				next(err, id, extname);
			});
		},
		function (id, extname, next) {
			picture._id = id;
			picture.ext = extname;
			self.pictures.push(picture);
			self.save(function (err) {
				next(err, picture);
			});
		}
	], callback);
};
AlbumSchema.methods.updatePicture = function (id, data, callback) {
	var picture = _.findWhere(this.pictures, { _id: id });
	if (!picture) {	// equals -1
		callback(new Error('Picture not exists'));
	} else {
		var index = this.pictures.indexOf(picture);
		_.extend(this.pictures[index], data);
		this.save(callback);
	}
};
AlbumSchema.methods.removePicture = function (id, callback) {
	var self = this;
	async.waterfall([
		function (next) {
			var picture = _.findWhere(self.pictures, { _id: id });
			next(picture ? null : new Error('Picture not exists'), picture);
		},
		function (picture, next) {
			var index = self.pictures.indexOf(picture);
			self.pictures.splice(index, 1);
			self.save(function (err) {
				next(err ? err : null, picture);
			});
		},
		function (picture, next) {
			var picturePath = self.getPicturePath(picture);
			fs.unlink(picturePath, function (err) {
				next(err, picture);
			});
		}
	], callback);
};

Album = db.model('Album', AlbumSchema);
module.exports = Album;
