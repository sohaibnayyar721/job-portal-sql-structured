

const mySql2 = require('mysql2/promise')

let connection;

const createConnection = async () => {
  if (connection) return connection;

  connection = await mySql2.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "jobportal"
  });

  return connection;
};
const connect = async () => {
  try {
    const connection = await createConnection();
    if (connection) {
      console.log("Sql Connected");
    }
    // Use the connection object here
  } catch (err) {
    console.error("Sql Connection Failed", err);
  }
};

module.exports = { createConnection, connect };
