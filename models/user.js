var crypto = require('crypto'),
	autoIncrement = require('mongoose-auto-increment'),
	db = require('./db'),
	Schema = db.Schema,
	UserSchema, User;

UserSchema = new Schema({
	username: { type: String, required: true, lowercase: true },
	password: { type: String, required: true },
	name: { type: String, default: '' },
	nickname: { type: String, default: '' },
	desc: { type: String, default: '' },
	email: { type: String, default: '', lowercase: true }
}, { _id: false });
UserSchema.plugin(autoIncrement.plugin, {
	model: 'User',
	field: '_id',
	startAt: 1
});

UserSchema.statics.encrypt = function (str) {
	return md5(str);
};

UserSchema.pre('save', function (next) {
	if (this.isModified('password')) {
		// encrypt password
		this.password = User.encrypt(this.password);
	}
	next();
});

User = db.model('User', UserSchema);
module.exports = User;

function md5(str) {
	return crypto.createHash('md5')
		.update(str).digest('hex');
}
