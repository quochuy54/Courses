newsRoute = require('./news');
siteRoute = require('./site');
courseRoute = require('./courses');
meRoute = require('./me');

function route(app){
    app.use('/news', newsRoute);
    app.use('/courses', courseRoute);
    app.use('/me', meRoute);
    app.use('/', siteRoute);
}

module.exports = route;

