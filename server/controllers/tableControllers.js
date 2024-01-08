
const tablesModel = require('../models/tableModel');


exports.getData = async (req, res) => {
  const { tableName } = req.params;
  try {
    const data = await tablesModel.fetchData(tableName);
    console.log(data)
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}