const dbInfo = require('../../conf/database');
const mysql = require('mysql');
const connection = mysql.createPool(dbInfo);

module.exports = connection;
