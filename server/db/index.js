const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

module.exports = db;
