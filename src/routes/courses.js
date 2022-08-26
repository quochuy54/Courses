const express = require('express');
const route = express.Router();
const courseController = require('../app/Controllers/CourseController');
const { redirectLogin } = require('../app/Middlewares/AuthenMiddleware');

route.get('/create', redirectLogin, courseController.create);
route.get('/:id/edit', redirectLogin, courseController.editCourses);
route.post('/handle-form-action', redirectLogin, courseController.handleFormAction);
route.delete('/:id', redirectLogin, courseController.deleteCourses);
route.delete('/:id/force', redirectLogin, courseController.forceDeleteCourses);
route.put('/:id', redirectLogin, courseController.updateCourses);
route.patch('/:id/restore', redirectLogin, courseController.restoreCourses);
route.post('/store', redirectLogin, courseController.store);
route.get('/:slug', courseController.show);

module.exports = route


