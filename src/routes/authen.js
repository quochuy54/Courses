const express = require('express');
const route = express.Router();
const authenController = require('../app/Controllers/AuthenController');
const authenMiddleware = require('../app/Middlewares/AuthenMiddleware');

route.get('/register', authenMiddleware.redirectHome, authenController.registerForm);
route.post('/register', authenMiddleware.redirectHome, authenController.register);
route.get('/login', authenMiddleware.redirectHome, authenController.loginForm);
route.post('/login', authenMiddleware.redirectHome, authenController.login);
route.get('/logout', authenMiddleware.redirectLogin, authenController.logout);

module.exports = route;
