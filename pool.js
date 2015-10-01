var mysql = require('mysql'),
		config = require('./config');

var pool = mysql.createPool({
	connectionLimit: 10, 
	host: 		config.dbHost,
	user: 		config.dbUser,
	port: 		config.dbPort,
	database: config.dbName,
	password: config.dbPassword
});

console.log('Database pool created successfully');

module.exports = pool;
