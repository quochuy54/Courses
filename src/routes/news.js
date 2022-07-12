const express = require('express');
const route = express.Router();
const newsController = require('../app/Controllers/NewsController');

route.use('/', newsController.index);

module.exports = route


