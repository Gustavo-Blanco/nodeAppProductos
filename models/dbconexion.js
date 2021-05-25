var mysql = require('mysql');
var conn = mysql.createConnection({
  host:"localhost",
  user:"gblanco",
  password:"123456",
  database:"tienda"
});
conn.connect();
module.exports = conn;
