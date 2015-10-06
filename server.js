var express = require('express'),
		bodyParser = require('body-parser'),
		auth = require('./auth'),
		routes = require('./routes'),
		morgan = require('morgan'),
		fs = require('fs'),
		port = process.env.PORT || 3000;
		
var app = express();

// Disable 'x-powered-by' response header (possible security hole). The client does not need to know what we are running.
app.set('x-powered-by', false);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Log to file
var logStream = fs.createWriteStream(__dirname + '/logger.log', { flags: 'a' });
app.use(morgan(':method :url :response-time :status :date[web]', { stream: logStream }));

// Log to console
app.use(morgan('dev'));

app.use(auth);
app.use('/api/user', routes.user);
app.use('/api/account', routes.account);

app.listen(port, function() {
  console.log('Server listening on port %d', port);
});
