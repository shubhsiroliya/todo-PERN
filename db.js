const Pool = require("pg").Pool;
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
  ssl: true,
});

fs.readFile("./database.sql", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  } else {
    pool.query(data, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        return;
      }
    });
  }
});
module.exports = pool;
