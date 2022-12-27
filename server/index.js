const express = require('express');
const db = require('./models/index');
const route = require('./routes/index');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());

route(app);

/* const sync = async() => {
  await db.sequelize.sync({force: true});
}

sync(); */


app.listen(process.env.PORT, () => console.log(`App is running on ${process.env.PORT}`));