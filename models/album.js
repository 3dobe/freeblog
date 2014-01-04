var db = require('./db'),
	Schema = db.Schema,
	Picture = require('Picture');

var AlbumSchema = new Schema({
	title: String,
	pictures: [Picture.schema],
	date: { type: Date, default: Date.now }
});
AlbumSchema.methods.addPicture = function (pic) {
	this.pictures.push(pic);
}
var Album = db.model('Album', AlbumSchema);

module.exports = Album;
