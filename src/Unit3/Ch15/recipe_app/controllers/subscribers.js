'use strict';

const
    mongoose = require('mongoose'),

    Subscriber = require('../models/subscriber');

exports.getSubscribeForm = (req, res) => {
    res.render('partials/contact');
};

exports.subscribe = (req, res) => {
    let subscriber = new Subscriber({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        zipCode: req.body.zipCode
    });
    subscriber.save()
        .then((result) => {
            res.render('partials/thanks');
        })
        .catch((error) => {
            if (error) res.send(`[ERROR]:\n${error}`);
        })
        .then(() => {
            console.log('[COMMIT]: Subscriber successfully saved');
        });
    // subscriber.save((error, result) => {
    //     if (error) res.send(error);
    //     res.render('partials/thanks');
    // });
};

exports.getAllSubscribers = (req, res) => {
    // Query: find all documents in the "subscribers" collection
    Subscriber.find({})
        // Execute the query:
        .exec()
        .then((subscribers) => {
            res.render('partials/subscribers', { subscribers: subscribers });
        })
        .catch((error) => {
            console.log(`[ERROR]:\n${error.message}`);
            return [];
        })
        .then(() => {
            console.log('[QUERY]: "Find all documents" completed successfully');
        });
};

// exports.getAllSubscribers = (req, res) => {
//     Subscriber.find({}, (error, subscribers) => {
//         if (error) next(error);
//         res.render('partials/subscribers', { subscribers: subscribers });
//     });
// };
