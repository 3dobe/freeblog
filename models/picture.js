var db = require('./db'),
	Schema = db.Schema;

var PictureSchema = new Schema({
	desc:  String,
	ext: String,
	date: { type: Date, default: Date.now }
});
var Picture = mongoose.model('Picture', PictureSchema);
module.exports = Picture;