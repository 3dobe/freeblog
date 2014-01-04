module.exports = function (app) {
	require('./auth')(app);
	require('./posts')(app);
	require('./albums')(app);
};
