var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

const temp = mysql.createConnection({
  host: "fdb1033.awardspace.net",
  user: "4373894_mahdb",
  password: "hakdogo123",
  database: "4373894_mahdb",
});

export { conn, mysql };
