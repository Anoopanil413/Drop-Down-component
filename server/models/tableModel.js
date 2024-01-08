const pool = require('../config/db');
const metadata = require('../config/metadata.json')

exports.fetchData = async (tableName) => {
    const table = metadata.tables.find(table => table.name === tableName);
    if (!table) {
      throw new Error(`Table not availble: ${tableName}`);
    }
  try {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
};