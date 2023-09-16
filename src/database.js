var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

const x = mysql.createConnection({
  host: "fdb1033.awardspace.net",
  user: "4373942_contacts",
  password: "hulaanmo12",
  database: "4373942_contacts",
});

export { conn, mysql };
