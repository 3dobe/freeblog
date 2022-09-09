var path = require('path'),
	rootDir = path.resolve(__dirname, '..'),
	contentDir = path.join(rootDir, 'content'),
	publicDir = path.join(rootDir, 'public');

module.exports = {
	rootDir: rootDir,
	viewDir: path.join(rootDir, 'views'),
	contentDir: contentDir,
	albumDir: path.join(contentDir, 'albums'),
	publicDir: publicDir,
	imgDir: path.join(publicDir, 'img'),
	cssDir: path.join(publicDir, 'css'),
	jsDir: path.join(publicDir, 'js'),

	host: 'localhost',
	port: 8008,
	secret: 'bad',
	mongo: 'mongodb://localhost/freeblog',
	admin: [
		{
			username: 'admin',
			password: 'admin',
			desc: '',
			email: ''
		}
	],
	pictureLimit: 5 * 1024 * 1024
};
