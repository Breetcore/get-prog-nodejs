'use strict';

const  Subscriber = require('../models/subscriber');

module.exports = {
    index: (req, res) => {
        // Query: find all documents in the "subscribers" collection
        Subscriber.find({})
            // Execute the query:
            .exec()
            .then((subscribers) => {
                res.render('partials/subscribers/index', { subscribers: subscribers });
            })
            .then(() => {
                console.log('[SUBSCRIBERS]: "Find all documents" completed successfully');
            })
            .catch((error) => {
                console.log(`[SUBSCRIBERS]: Error fetching documents\n${error.message}`);
                return [];
            });
    },
    new: (req, res) => {
        res.render('partials/subscribers/new');
    },
    create: (req, res, next) => {
        let inboundParams = {
            name: {
                first: req.body.first,
                last: req.body.last
            },
            email: req.body.email,
            zipCode: req.body.zipCode
        };
        console.log(`[SUBSCRIBERS] inboundParams: ${JSON.stringify(inboundParams)}`);
        Subscriber.create(inboundParams)
            .then(subscriber => {
                console.log(`[SUBSCRIBERS]: New subscriber created: ${subscriber.fullName}`);
                res.locals.subscriber = subscriber;
                res.locals.redirect = '/subscribers/thanks';
                next();
            })
            .catch(error => {
                console.log(`[SUBSCRIBERS]: Error creating subscriber: ${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res, next) => {
        let path = res.locals.redirect;
        if (path !== undefined) {
            console.log(`[SUBSCRIBERS]: Redirecting to: ${res.locals.redirect}`);
            res.redirect(path);
        }
        else next();
    },
    thanks: (req, res) => {
        res.render('partials/subscribers/thanks');
    }
};
