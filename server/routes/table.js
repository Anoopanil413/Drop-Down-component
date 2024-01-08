const express = require('express')
const router = express.Router()

const tablesController = require('../controllers/tableControllers');
const metadata = require('../config/metadata.json')



router.get('/metadata', (req, res) => {
    console.log(metadata)
    res.json(metadata);
  });

router.get('/:tableName', tablesController.getData);




module.exports = router