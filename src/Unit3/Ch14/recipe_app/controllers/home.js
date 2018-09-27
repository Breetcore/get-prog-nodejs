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

exports.showHome = (req, res) => {
    res.render('index');
};
exports.showCourses = (req, res) => {
    res.render('partials/courses', {
        offeredCourses: courses
    });
};
exports.showSignUp = (req, res) => {
    res.render('partials/contact');
};
exports.postContactForm = (req, res) => {
    res.render('partials/thanks');
};
