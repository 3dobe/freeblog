var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Picture = require('Picture');

var AlbunSchema = new Schema({
	title:  String,
	pictures: [Picture],
	date: { type: Date, default: Date.now }
});
var Albun = mongoose.model('Albun', AlbunSchema);

module.exports = Albun;