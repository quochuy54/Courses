const express = require('express');
const route = express.Router();
const meController = require('../app/Controllers/MeController');



route.use('/stored/courses', meController.storedCourses);
route.use('/trash/courses', meController.trashCourses);

module.exports = route


