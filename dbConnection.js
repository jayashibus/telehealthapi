const mysql = require("mysql2");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cfc_telemetrix",
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});
module.exports = conn;
