var db = require('./db'),
	Schema = db.Schema;

var UserSchema = new Schema({
	name: String,
	nickname: String,
	username:  String,
	password: String,
	desc:   String,
	email: String
});
var User = db.model('User', UserSchema);

module.exports = User;
