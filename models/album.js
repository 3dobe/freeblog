var autoIncrement = require('mongoose-auto-increment'),
	db = require('./db'),
	Schema = db.Schema,
	ObjectId = Schema.ObjectId,
	PictureSchema, AlbumSchema, Album;

PictureSchema = new Schema({
	_id: ObjectId,
	desc: { type: String, default: '' },
	ext: { type: String, default: '' },
	date: { type: Date, default: Date.now }
});

AlbumSchema = new Schema({
	title: { type: String, default: '' },
	pictures: [PictureSchema],
	date: { type: Date, default: Date.now }
});
AlbumSchema.plugin(autoIncrement.plugin, {
	model: 'Album',
	field: '_id',
	startAt: 1
});

AlbumSchema.methods.addPicture = function (picture, callback) {
	picture._id = new ObjectId();
	this.pictures.push(picture);
	callback(null);
};

Album = db.model('Album', AlbumSchema);
module.exports = Album;
