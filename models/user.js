var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	nickname: String,
	username:  String,
	password: String,
	desc:   String,
	email: String
});
var User = mongoose.model('User', UserSchema);

module.exports = User;