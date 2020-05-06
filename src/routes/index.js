const express = require('express');

const app = express();

app.use(require('./monitoring'));
app.use(require('./get_ads'));
app.use(require('./ads_filter'));



module.exports = app;