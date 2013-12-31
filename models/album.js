var db = require('./db'),
	Schema = db.Schema,
	Picture = require('Picture');

var AlbunSchema = new Schema({
	title:  String,
	pictures: [Picture],
	date: { type: Date, default: Date.now }
});
AlbunSchema.methods.addPicture = function(pic){
	this.pictures.push(pic);
}
var Albun = mongoose.model('Albun', AlbunSchema);

module.exports = Albun;