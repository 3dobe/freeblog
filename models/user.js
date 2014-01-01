var crypto = require('crypto'),
	db = require('./db'),
	Schema = db.Schema;

var UserSchema = new Schema({
	name: String,
	nickname: String,
	username: String,
	password: String,
	desc: String,
	email: String
});

UserSchema.statics.encrypt = function (str) {
	return md5(str);
};

UserSchema.pre('save', function (next) {
	// save into db after encrypting password
	this.password = User.encrypt(this.password);
	next();
});

var User = db.model('User', UserSchema);
module.exports = User;

function md5(str) {
	return crypto.createHash('md5')
		.update(str).digest('hex');
}
