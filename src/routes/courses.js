const express = require('express');
const route = express.Router();
const courseController = require('../app/Controllers/CourseController');


route.use('/create', courseController.create);
route.use('/:id/edit', courseController.editCourses);
route.post('/handle-form-action', courseController.handleFormAction);
route.delete('/:id', courseController.deleteCourses);
route.delete('/:id/force', courseController.forceDeleteCourses);
route.put('/:id', courseController.updateCourses);
route.patch('/:id/restore', courseController.restoreCourses);
route.use('/store', courseController.store);
route.use('/:slug', courseController.show);

module.exports = route


