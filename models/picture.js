var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PictureSchema = new Schema({
	desc:  String,
	ext: String
});
var Picture = mongoose.model('Picture', PictureSchema);
module.exports = Picture;