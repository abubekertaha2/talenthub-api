// import mysql from 'mysql2/promise';
// import 'dotenv/config';

// // Create the connection pool for localhost
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//   ssl: {
//     ca: process.env.DB_SSL_CA
//   }
// });

// export default pool;

// console.log('Database connection pool created.');
import mysql from 'mysql2/promise';
import 'dotenv/config';
import fs from 'fs'; 
import path from 'path';

const caCertPath = path.resolve('../certs/aiven_ca.pem');

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync(caCertPath)
  }
});

export default pool;

console.log('Database connection pool created.');