const Course = require('../Models/Course')
const { MutiMongooseToOjbect } = require('../../util/mongoose')

class SiteController{

    // [GET] home
    index(req, res, next){
        Course.find({})
            .then(courses => res.render('home', {courses: MutiMongooseToOjbect(courses)}))  
            .catch(next)           
    }

    // [GET] search
    search(req, res){
        res.render('search');
    }
}

module.exports = new SiteController
