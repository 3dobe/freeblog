var autoIncrement = require('mongoose-auto-increment'),
	db = require('./db'),
	Schema = db.Schema,
	uuid = require('node-uuid').v4,
	CommentSchema, PostSchema, Post,
	_ = require('underscore');

CommentSchema = new Schema({
	_id: { type: String, required: true },
	name: { type: String, default: '' },
	body: { type: String, default: '' },
	date: { type: Date, default: Date.now }
});

PostSchema = new Schema({
	title: { type: String, required: true },
	body: { type: String, default: '' },
	comments: [CommentSchema],
	date: { type: Date, default: Date.now }
}, { _id: false });
PostSchema.plugin(autoIncrement.plugin, {
	model: 'Post',
	field: '_id',
	startAt: 1
});
PostSchema.methods.addComment = function (comment, callback) {
	comment._id = uuid();
	this.comments.push(comment);
	this.save(callback);
};
PostSchema.methods.deleteComment = function (id, callback) {
	var comment = _.findWhere(this.comments, { _id: id });
	if (!comment) {
		callback(new Error('Comment not exists'));
	} else {
		var index = this.comments.indexOf(comment);
		this.comments.splice(index, 1);
		this.save(callback);
	}
}
PostSchema.methods.updateComment = function (id, body, callback) {
	var comment = _.findWhere(this.comments, { _id: id });
	if (!comment) {
		callback(new Error('Comment not exists'));
	} else {
		var index = this.comments.indexOf(comment);
		_.extend(this.comments[index], body);
		this.save(callback);
	}
}
Post = db.model('Post', PostSchema);
module.exports = Post;
