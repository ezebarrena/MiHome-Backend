const  fileUpload = require( "express-fileupload")
const {v2} =  require('cloudinary')

const express = require('express');
const {dbConnection} = require('./src/db/config');
const cors = require('cors');

const app = express();
require('dotenv').config();

          
v2.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

dbConnection();
const PORT = 8080;

app.use("/", require('./src/routes/users.routes'));
app.use("/", require('./src/routes/realEstates.routes'));
app.use("/", require('./src/routes/assets.routes'));

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

module.exports = app;