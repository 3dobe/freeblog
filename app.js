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

// routes
routes(app);

// listen on port
app.listen(port, function () {
	console.log('server started');
	console.log('port: %d, pid: %d', port, process.pid);
});
