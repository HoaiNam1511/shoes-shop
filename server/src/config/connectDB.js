var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shoesshop",
});

// var dbconnection = mysql.createPool(pool);

// // Attempt to catch disconnects
// dbconnection.on("connection", function (connection) {
//   console.log("DB Connection established");

//   connection.on("error", function (err) {
//     console.error(new Date(), "MySQL error", err.code);
//   });
//   connection.on("close", function (err) {
//     console.error(new Date(), "MySQL close", err);
//   });
// });

module.exports = connection;
