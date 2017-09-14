var mysql = require('mysql');
var config = require('../config.json');

var pool = mysql.createPool({

    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,

    connectionLimit: 10
});

module.exports = pool;