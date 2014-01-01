var db = require('./db'),
	CommentSchema, PostSchema, Post;

CommentSchema = new db.Schema({
	name: String,
	body: String,
	date: { type: Date, default: Date.now }
});

PostSchema = new db.Schema({
	title:  String,
	author: String,
	body:   String,
	comments: [CommentSchema],
	date: { type: Date, default: Date.now }
});
PostSchema.methods.addComment = function(name, body){
	this.comments.push({ name: name, body: body });
}

Post = db.model('Post', PostSchema);
module.exports = Post;
