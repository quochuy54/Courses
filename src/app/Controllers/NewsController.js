const Course = require('../Models/Course');
class NewController{

    //[GET] /news
    index(req, res, next){
        // res.render('news');

        Course.find({})
            .then(courses => res.json(courses))
            .catch(next)
    }
}

module.exports = new NewController;