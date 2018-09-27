'use strict';

var courses = [
    {
        title: 'Event Driven Cakes',
        cost: 50
    },
    {
        title: 'Asynchronous Artichoke',
        cost: 25
    },
    {
        title: 'Object Oriented Orange Juice',
        cost: 10
    }
];

const getCourses = () => new Promise((resolve, reject) => {
    if (courses) {
        resolve(courses);
    }
    else {
        reject('[WARNING]: No courses available');
    }
});

exports.showHome = (req, res) => {
    res.render('index');
};

exports.showCourses = (req, res) => {
    getCourses()
        .then(availableCourses => {
            res.render('partials/courses', {
                offeredCourses: availableCourses
            });
        })
        .catch(error => {
            console.log(`[ERROR]:\n${JSON.stringify(error)}`)
        })
        .then(() => {
            console.log('Courses retrieved successfully');
        })
};

exports.postContactForm = (req, res) => {
    res.render('partials/thanks');
};
