var express = require('express'),
		bodyParser = require('body-parser'),
		auth = require('./auth'),
		routes = require('./routes');
		
var app = express();

// Disable 'x-powered-by' response header (possible security hole). The client does not need to know what we are running.
app.set('x-powered-by', false);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(auth);
app.use('/api/user', routes.user);
app.use('/api/account', routes.account);

app.listen(3000, function() {
  console.log('Server listening on port %d', 3000);
});
