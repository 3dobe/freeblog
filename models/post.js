var autoIncrement = require('mongoose-auto-increment'),
	db = require('./db'),
	CommentSchema, PostSchema, Post;

CommentSchema = new db.Schema({
	name: String,
	body: String,
	date: { type: Date, default: Date.now }
});

PostSchema = new db.Schema({
	title:  String,
	body:   String,
	comments: [CommentSchema],
	date: { type: Date, default: Date.now }
});
PostSchema.plugin(autoIncrement.plugin, {
	model: 'Post',
	field: 'id',
	startAt: 1
});
PostSchema.methods.addComment = function(name, body){
	this.comments.push({ name: name, body: body });
};

Post = db.model('Post', PostSchema);
module.exports = Post;
