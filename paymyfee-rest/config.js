var mysql = require('mysql');
var cfg = {};
cfg.dbconfig = {
    connectionLimit: 2,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'paymyfee'
};

//Create a database connection pool for mysql. 
cfg.dbcp = mysql.createPool(cfg.dbconfig);

module.exports = cfg;
