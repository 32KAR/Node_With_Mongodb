const path = require('path');
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

app.set("views", path.join(__dirname, 'app/views'));
app.set("view engine", "ejs");

app.use('/', require('./app/routes/route'));

app.use(express.static('app/uploads'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
