const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10,
  password: "0000",
  user: "root",
  database: "test",
  host: "localhost",
  port: "3306",
});

let testdb = {};

testdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM balance", (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

testdb.one = (project) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM balance WHERE project = ?",
      [project],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      }
    );
  });
};

module.exports = testdb;
