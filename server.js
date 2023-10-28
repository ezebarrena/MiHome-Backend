const express = require('express');
const {dbConnection} = require('./src/db/config');
const cors = require('cors');
const app = express();

require('dotenv').config();


app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbConnection();
const PORT = 8080;

app.use("/", require('./src/routes/users.routes'));
app.use("/", require('./src/routes/realEstates.routes'));
app.use("/", require('./src/routes/assets.routes'));

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

module.exports = app;