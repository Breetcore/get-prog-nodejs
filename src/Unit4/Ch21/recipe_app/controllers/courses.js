'use strict';

const Course = require('../models/course');

// Helper methods:
let getCourseParams = (body) => {
    return {
        title: body.title,
        description: body.description,
        maxStudents: body.maxStudents,
        cost: body.cost
    };
};

module.exports = {
    // Route actions:
    index: (req, res, next) => {
        Course.find({})
            .then(courses => {
                res.locals.courses = courses;
                next();
            })
            .catch(error => {
                console.log(`[COURSES]: Error fetching courses: ${error.message}`)
                next();
            });
    },
    indexView: (req, res) => {
        res.render('partials/courses/index');
    },
    show: (req, res, next) => {
        let courseId = req.params.id;
        console.log(`[COURSES]: Course ID: ${courseId}`);
        Course.findById(courseId)
            .then(course => {
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`[COURSES]: Error fetching course by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render('partials/courses/show');
    },
    new: (req, res) => {
        res.render('partials/courses/new');
    },
    create: (req, res, next) => {
        let inboundParams = getCourseParams(req.body);
        console.log(`[COURSES]: inboundParams: ${JSON.stringify(inboundParams)}`);
        Course.create(inboundParams)
            .then(course => {
                console.log(`[COURSES]: New course created: ${course.title}`);
                res.locals.course = course;
                res.locals.redirect = '/courses';
                next();
            })
            .catch(error => {
                console.log(`[COURSES]: Error creating course: ${error.message}`);
                next(error);
            });
    },
    edit: (req, res, next) => {
        let courseId = req.params.id;
        console.log(`[COURSES]: Course ID: ${courseId}`);
        Course.findById(courseId)
            .then(course => {
                res.render(`partials/courses/edit`, {
                    course: course
                });
            })
            .catch(error => {
                console.log(`[COURSES]: Error fetching course by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let
            courseId = req.params.id,
            inboundParams = getCourseParams(req.body);
        Course.findByIdAndUpdate(courseId, { $set: inboundParams })
            .then(course => {
                console.log(`[COURSES]: Course updated: ${course.fullName}`);
                res.locals.redirect = `/courses/${courseId}`;
                res.locals.course = course;
                next();
            })
            .catch(error => {
                console.log(`[COURSES]: Error updating user by ID: ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) => {
        let courseId = req.params.id;
        Course.findByIdAndRemove(courseId)
            .then(() => {
                res.locals.redirect = '/courses';
                next();
            })
            .catch(error => {
                console.log(`[COURSES]: Error deleting course by ID: ${error.message}`);
                next();
            });
    },
    redirectView: (req, res, next) => {
        let path = res.locals.redirect;
        if (path !== undefined) {
            console.log(`[COURSES]: Redirecting to: ${res.locals.redirect}`);
            res.redirect(path);
        }
        else next();
    }
};
