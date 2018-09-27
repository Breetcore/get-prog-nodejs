'use strict';

const User = require('../models/user');

// Helper methods:
let getUserParams = (body) => {
    return {
        name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        zipCode: body.zipCode,
        password: body.password
    };
};

module.exports = {
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`[USERS]: Error fetching users: ${error.message}`)
                next();
            });
    },
    indexView: (req, res) => {
        res.render('partials/users/index');
    },
    show: (req, res, next) => {
        let userId = req.params.id;
        console.log(`[USERS]: User ID: ${userId}`);
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`[USERS]: Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render('partials/users/show');
    },
    new: (req, res) => {
        res.render('partials/users/new');
    },
    create: (req, res, next) => {
        let inboundParams = getUserParams(req.body);
        console.log(`[USERS]: inboundParams: ${JSON.stringify(inboundParams)}`);
        User.create(inboundParams)
            .then(user => {
                console.log(`[USERS]: New user created: ${user.fullName}`);
                res.locals.user = user;
                res.locals.redirect = '/users';
                next();
            })
            .catch(error => {
                console.log(`[USERS]: Error creating user: ${error.message}`);
                next(error);
            });
    },
    edit: (req, res, next) => {
        let userId = req.params.id;
        console.log(`[USERS]: User ID: ${userId}`);
        User.findById(userId)
            .then(user => {
                res.render(`partials/users/edit`, {
                    user: user
                });
            })
            .catch(error => {
                console.log(`[USERS]: Error fetching user by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let
            userId = req.params.id,
            userParams = getUserParams(req.body);
        User.findByIdAndUpdate(userId, {
            $set: userParams
        })
            .then(user => {
                console.log(`[USERS]: User updated: ${user.fullName}`);
                res.locals.redirect = `/users/${userId}`;
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`[USERS]: Error updating user by ID: ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) => {
        let userId = req.params.id;
        User.findByIdAndRemove(userId)
            .then(() => {
                res.locals.redirect = '/users';
                next();
            })
            .catch(error => {
                console.log(`[USERS]: Error deleting user by ID: ${error.message}`);
                next();
            });
    },
    redirectView: (req, res, next) => {
        let path = res.locals.redirect;
        if (path !== undefined) {
            console.log(`[USERS]: Redirecting to: ${res.locals.redirect}`);
            res.redirect(path);
        }
        else next();
    }
};
