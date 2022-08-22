const { MongooseToOjbect, MutiMongooseToOjbect } = require('../../util/mongoose')
const Course = require('../Models/Course');
class CoursesController{

    //[GET] /courses/:slug
    show(req, res, next){
        const course = Course.findOne({slug: req.params.slug})
        const courseList = Course.find();
        Promise.all([course, courseList])
        .then(
            ([course, courseList]) => {
                res.render('courses/course-detail', 
                {
                    course: MongooseToOjbect(course), 
                    courseList: MutiMongooseToOjbect(courseList)
                })
            }
        )
        .catch(next)

    }

    //[GET] /courses/create
    create(req, res, next){
        res.render('courses/create')
    }

    //[POST] /courses/store
    store(req, res, next){
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/maxresdefault.jpg`
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //[GET] /courses/:id/edit
    editCourses(req, res, next){
        Course.findOne({_id: req.params.id})
            .then(course => res.render('courses/edit', course))
    }

    //[PUT] /courses/:id
    updateCourses(req, res, next){
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${formData.videoId}/maxresdefault.jpg`
        Course.updateOne({_id: req.params.id}, formData)
            .then(res.redirect('/me/stored/courses'))
    }

    //[DELETE] /courses/:id
    deleteCourses(req, res, next){
        Course.delete({_id: req.params.id})
            .then(res.redirect('back'))
            .catch(next)
    }

    //[DELETE] /courses/:id/force
    forceDeleteCourses(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(res.redirect('back'))
            .catch(next)
    }

    //[PATCH] /courses/:id/restore
    restoreCourses(req, res, next){
        Course.restore({_id: req.params.id})
            .then(res.redirect('back'))
            .catch(next)
    }

    //[POST] courses/handle-form-action
    handleFormAction(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({_id: { $in: req.body.courseIds} })
                    .then(res.redirect('back'))
                    .catch(next)
                break
            case 'restoreAll':
                Course.restore({_id: { $in: req.body.courseIds} })
                    .then(res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({message: 'Action invalided'})
        }
    }
}

module.exports = new CoursesController;