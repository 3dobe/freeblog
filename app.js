// app title
process.title = 'freeblog';

var express = require('express'),
	routes = require('./routes'),
	config = require('./config'),
	env = config.env,
	port = config.port,
	publicDir = config.publicDir,
	app = express();

app.set('views', config.viewDir);
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(config.secret));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: publicDir }));
app.use(express.static(publicDir));
app.use(function (err, req, res, next) {
	// error handling
	// 4 parameters required to takie in error
	res.render('error', {
		name: '500 Internal Server Error',
		message: 'Shit, something blew up with our server.'
	});
	console.error(err.stack);
	next(err);
});

// routes
routes(app);

// listen on port
app.listen(port, function () {
	console.log('server started');
	console.log('port: %d, pid: %d', port, process.pid);
});
