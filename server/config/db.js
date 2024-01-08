const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.User,
  host: process.env.Host,
  database: process.env.DbName,
  password: process.env.Password,
  port: process.env.DbPort,
});

module.exports = pool;
