
//Dependecies
var mysql = require("mysql");
var dotenv = require("dotenv");
dotenv.config();

//SetUp Connection
var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.pass,
    database: process.env.db
});

//EXPORT DATABASE CONNECTION
module.exports = con; 