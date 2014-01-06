// app title
process.title = 'freeblog';

var express = require('express'),
	routes = require('./routes'),
	config = require('./config'),
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
app.use(require('less-middleware')({ src: publicDir }));
app.use(express.static(publicDir));

// listen on port
app.listen(port, function () {
	console.log('server started');
	console.log('port: %d, pid: %d', port, process.pid);
});
