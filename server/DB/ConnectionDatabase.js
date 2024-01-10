const mysql = require('mysql');


// sql conncetion
const connection = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"movies",
    charset: ""
});

connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });


  module.exports = {
    query: (sql, values) => {
      return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });
      });
    },
    end: () => {
      connection.end();
    },
  };


