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
	posts: [
		{
			title: 'Title 1111',
			body: 'This is an article 111 111 111 111111 1111111'
		},
		{
			title: 'Title 222222',
			body: 'This is an article 2222 22222 22222 222222 222222',
			comments: [
				{ _id: uuid(), name: 'user1', body: 'This is a comment 1111' },
				{ _id: uuid(), name: 'user2', body: 'This is a comment 222222' }
			]
		}
	],
	albums: [
		{
			title: 'Album 11',
			pictures: [
				{ _id: '5478737', ext: '.png', desc: 'node200ok' },
				{ _id: '6942497', ext: '.png', desc: 'eyescantsee' },
				{ _id: '5885450', ext: '.png', desc: 'FvckSh1t' },
				{ _id: '5550559', ext: '.png', desc: 'IamJayden' },
				{ _id: '6227690', ext: '.png', desc: '3dobe' }
			]
		},
		{
			title: 'Album 2222',
			pictures: [
				{ _id: '6234679', ext: '.png', desc: 'YuJianSirius' },
				{ _id: '6647633', ext: '.jpeg', desc: 'fritx' },
				{ _id: '8917887', ext: '.jpeg', desc: 'Alen-gao' },
				{ _id: '5418228', ext: '.jpeg', desc: 'funkyLover' }
			]
		}
	],
	pictureLimit: 5 * 1024 * 1024
};
