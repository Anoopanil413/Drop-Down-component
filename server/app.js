const express = require("express");
const app = express();
require('dotenv').config()

const port = process.env.PORT || 8000

const tablesRoutes = require('./routes/table')
app.use('/api', tablesRoutes)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });


