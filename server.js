var express = require('express'),
		bodyParser = require('body-parser'),
		auth = require('./auth'),
		routes = require('./routes');
		
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(auth);
app.use('/api/user', routes.user);
app.use('/api/account', routes.account);

app.listen(3000, function() {
  console.log('Server listening on port %d', 3000);
});
