'use strict';

const Course = require('../models/course');

module.exports = {
    index: (req, res) => {
        Course.find({})
            .then(courses => {
                res.render('partials/courses/index', {
                    courses: courses
                })
            })
            .catch(error => {
                console.log(`[COURSES]: Error fetching courses: ${error.message}`)
                res.redirect('/');
            });
    }
};
