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

module.exports = {
    showHome: (req, res) => {
        new Promise(resolve => { res.render('index'); }, reject => { console.log('[ERROR]: Rendering "index" view rejected'); })
            .then(() => {
                console.log('View "index" rendered');
            })
            .catch(() => {
                console.log('[ERROR]: Unexpected failure while rendering "index" view');
            }
        );
    },
    showCourses: (req, res) => {
        getCourses()
            .then(availableCourses => {
                res.render('partials/courses', {
                    offeredCourses: availableCourses
                });
            })
            .then(() => {
                console.log('Courses retrieved successfully');
            })
            .catch(error => {
                console.log(`[ERROR]:\n${JSON.stringify(error)}`)
            }
        );
    },
    postContactForm: (req, res) => {
        new Promise((resolve, reject) => {
            resolve();
        })
            .then(() => {
                res.render('partials/thanks');
            })
            .catch(() => {
                console.log('[ERROR]: Failed to render "thanks" partial view');
            });
    }
};
