// app environment
// development | test | production
if (!process.env['NODE_ENV']) {
	var env = process.argv && process.argv[2] || 'development';
	process.env['NODE_ENV'] = env;
}
// app title
process.title = 'freeblog';

var express = require('express'),
	routes = require('./routes'),
	config = require('./config'),
	port = config.port,
	publicDir = config.publicDir,
	app = express();

app.configure(function () {
	app.set('views', config.viewDir);
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser(config.secret));
	app.use(express.session());
	app.use(require('less-middleware')({ src: publicDir }));
	app.use(app.router);
	app.use(express.static(publicDir));
});

// error handling
app.configure(function () {
	app.configure('development', function () {
		// already including error logging
		app.use(express.errorHandler());
	});
	app.configure('production', function () {
		app.use(function (err, req, res, next) {
			// 4 parameters required to takie in error
			console.error(err.stack);
			res.send(500);
		});
	});
});

// routes
routes(app);

// listen on port
app.listen(port, function () {
	console.log('server started');
	console.log('port: %d, pid: %d', port, process.pid);
});
