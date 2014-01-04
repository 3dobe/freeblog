module.exports = function (app) {
	require('./auth')(app);
	require('./albums')(app);
};
