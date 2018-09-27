'use strict';

const Subscriber = require('../models/subscriber');

// Helper methods:
let getSubscriberParams = (body) => {
    return {
        name: {
            first: body.first,
            last: body.last
        },
        email: body.email,
        zipCode: body.zipCode
    };
};

module.exports = {
    // Route actions:
    index: (req, res, next) => {
        // Query: find all documents in the "subscribers" collection
        Subscriber.find({})
            .then((subscribers) => {
                res.locals.subscribers = subscribers;
                next();
            })
            .catch((error) => {
                console.log(`[SUBSCRIBERS]: Error fetching subscribers\n${error.message}`);
                next();
            });
    },
    indexView: (req, res) => {
        res.render('partials/subscribers/index');
    },
    show: (req, res, next) => {
        let subscriberId = req.params.id;
        console.log(`[SUBSCRIBERS]: Subscriber ID: ${subscriberId}`);
        Subscriber.findById(subscriberId)
            .then(subscriber => {
                res.locals.subscriber = subscriber;
                next();
            })
            .catch(error => {
                console.log(`[SUBSCRIBERS]: Error fetching subscriber by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render('partials/subscribers/show');
    },
    new: (req, res) => {
        res.render('partials/subscribers/new');
    },
    create: (req, res, next) => {
        let inboundParams = getSubscriberParams(req.body);
        console.log(`[SUBSCRIBERS]: inboundParams: ${JSON.stringify(inboundParams)}`);
        Subscriber.create(inboundParams)
            .then(subscriber => {
                console.log(`[SUBSCRIBERS]: New subscriber created: ${subscriber.fullName}`);
                res.locals.subscriber = subscriber;
                res.locals.redirect = '/subscribers';
                next();
            })
            .catch(error => {
                console.log(`[SUBSCRIBERS]: Error creating subscriber: ${error.message}`);
                next(error);
            });
    },
    edit: (req, res, next) => {
        let subscriberId = req.params.id;
        console.log(`[SUBSCRIBERS]: Subscriber ID: ${subscriberId}`);
        Subscriber.findById(subscriberId)
            .then(subscriber => {
                res.render(`partials/subscribers/edit`, {
                    subscriber: subscriber
                });
            })
            .catch(error => {
                console.log(`[SUBSCRIBERS]: Error fetching course by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let
            subscriberId = req.params.id,
            inboundParams = getSubscriberParams(req.body);
        Subscriber.findByIdAndUpdate(subscriberId, { $set: inboundParams })
            .then(subscriber => {
                console.log(`[SUBSCRIBERS]: Subscriber updated: ${subscriber.fullName}`);
                res.locals.redirect = `/subscribers/${subscriberId}`;
                res.locals.subscriber = subscriber;
                next();
            })
            .catch(error => {
                console.log(`[SUBSCRIBERS]: Error updating subscriber by ID: ${error.message}`);
                next(error);
            });
    },
    delete: (req, res, next) => {
        let subscriberId = req.params.id;
        Subscriber.findByIdAndRemove(subscriberId)
            .then(() => {
                res.locals.redirect = '/subscribers';
                next();
            })
            .catch(error => {
                console.log(`[SUBSCRIBERS]: Error deleting subscriber by ID: ${error.message}`);
                next();
            });
    },
    redirectView: (req, res, next) => {
        let path = res.locals.redirect;
        if (path !== undefined) {
            console.log(`[SUBSCRIBERS]: Redirecting to: ${res.locals.redirect}`);
            res.redirect(path);
        }
        else next();
    }
};
