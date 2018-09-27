'use strict';

const User = require('../models/user');

module.exports = {
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`)
                //res.redirect('/');
                next();
            });
    },
    indexView: (req, res) => {
        res.render('partials/users/index');
    }
};
