const newsRoute = require('./news');
const siteRoute = require('./site');
const courseRoute = require('./courses');
const meRoute = require('./me');
const authenRoute = require('./authen');
const authenMiddleware = require('../app/Middlewares/AuthenMiddleware');

function route(app){
    app.use('/authen', authenRoute);
    app.use('/courses', courseRoute);
    app.use('/me', authenMiddleware.redirectLogin, meRoute);
    app.use('/', siteRoute);
}

module.exports = route;

