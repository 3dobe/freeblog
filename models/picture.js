var db = require('./db'),
	Schema = db.Schema;

var PictureSchema = new Schema({
	desc:  String,
	ext: String,
	date: { type: Date, default: Date.now }
});
var Picture = db.model('Picture', PictureSchema);
module.exports = Picture;
