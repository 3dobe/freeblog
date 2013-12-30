var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PostSchema = new Schema({
	title:  String,
	author: String,
	body:   String,
	comments: [{ name: String, body: String, date: Date }],
	date: { type: Date, default: Date.now }
});
PostSchema.methods.addComment = function(name, body){
	this.comments.push({ name: name, body: body, date:{ type: Date, default: Date.now }});
}
var Post = mongoose.model('Post', PostSchema);

module.exports = Post;