const { MutiMongooseToOjbect } = require('../../util/mongoose')
const Course = require('../Models/Course');
class MeController{

    //[GET] /me/stored/courses
    storedCourses(req, res, next){
        let courseQuery = Course.find({});
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => {
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: MutiMongooseToOjbect(courses)
                })
            })
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next){
        let courseDeleted = Course.findDeleted({});

        if(req.query.hasOwnProperty('_sort')){
            courseDeleted = courseDeleted.sort({
                [req.query.column]: req.query.type
            })
        }
          
        courseDeleted.then(courses => res.render('me/trash-courses', {courses: MutiMongooseToOjbect(courses)}))
            .catch(next)
    }

}

module.exports = new MeController;
