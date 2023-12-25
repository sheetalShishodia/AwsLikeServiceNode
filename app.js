const express = require('express');
const bodyparser = require('body-parser');
const UserRouter = require('./routes/user.route');
const s3Bucket = require('./routes/s3.route')

const app = express();
app.use(bodyparser.json());

app.use('/',UserRouter)
app.use('/',s3Bucket)


module.exports = app