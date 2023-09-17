var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

const connx = mysql.createConnection({
  host: "fdb1033.awardspace.net",
  user: "4373894_contacts",
  password: "hakdogo123",
  database: "4373894_contacts",
  connectTimeout: 20000,
});

export { conn, mysql };
