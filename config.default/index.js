var path = require('path'),
	rootDir = path.resolve(__dirname, '..'),
	viewDir = path.resolve(rootDir, 'views'),
	publicDir = path.resolve(rootDir, 'public'),
	imgDir = path.resolve(publicDir, 'img'),
	cssDir = path.resolve(publicDir, 'css'),
	jsDir = path.resolve(publicDir, 'js');

module.exports = {
	rootDir: rootDir,
	viewDir: viewDir,
	publicDir: publicDir,
	imgDir: imgDir,
	cssDir: cssDir,
	jsDir: jsDir,

	port: 8008,
	secret: 'bad',
	mongo: 'mongodb://localhost/freeblog',
	admin: [{
		username: 'admin',
		password: 'admin',
		desc: '',
		email: ''
	}]
};
