var autoIncrement = require('mongoose-auto-increment'),
	db = require('./db'),
	Schema = db.Schema,
	ObjectId = Schema.ObjectId,
	CommentSchema, PostSchema, Post,
	_ = require('underscore');

CommentSchema = new Schema({
	_id: ObjectId,
	name: String,
	body: String,
	date: { type: Date, default: Date.now }
});

PostSchema = new Schema({
	title: String,
	body: String,
	comments: [CommentSchema],
	date: { type: Date, default: Date.now }
}, { _id: false });
PostSchema.plugin(autoIncrement.plugin, {
	model: 'Post',
	field: '_id',
	startAt: 1
});
PostSchema.methods.addComment = function (comment, callback) {
	comment.id = new ObjectId();
	this.comments.push(comment);
	callback(null);
};
PostSchema.methods.deleteComment = function (id, callback) {
	var comment = _.findWhere(this.comments, { _id: id }),
		index = this.comments.indexOf(comment);
	if (index === -1) {
		callback(new Error('No such comment'));
	} else {
		this.comments.splice(index, 1);
		callback(null);
	}
}
Post = db.model('Post', PostSchema);
module.exports = Post;
