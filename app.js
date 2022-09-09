// app title
process.title = 'freeblog';

process.on('uncaughtException', function (err) {
	console.error('uncaughtException', err.stack || err);
});

var express = require('express'),
	routes = require('./routes'),
	config = require('./config'),
	host = config.host,
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

// message
app.use(function (req, res, next) {
	res.pushMessage = function (message) {
		res.cookie('message', message, { httpOnly: false });
	};
	next();
});
// routes
routes(app);
// static
app.use(express.static(publicDir));

// listen on port
app.listen(port, host, function () {
	console.log('server started');
	console.log('http://%s:%d  pid: %d', host, port, process.pid);
});
