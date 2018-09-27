'use strict';

const
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
        .then(() => {
            console.log('[COMMIT]: Subscriber successfully saved');
        })
        .catch((error) => {
            if (error) res.send(`[ERROR]: ${error}`);
            //if (error) res.render('partials/contact', { errMsg: error.message});
        });
};

exports.getAllSubscribers = (req, res) => {
    // Query: find all documents in the "subscribers" collection
    Subscriber.find({})
        // Execute the query:
        .exec()
        .then((subscribers) => {
            res.render('partials/subscribers', { subscribers: subscribers });
        })
        .then(() => {
            console.log('[QUERY]: "Find all documents" completed successfully');
        })
        .catch((error) => {
            console.log(`[ERROR]:\n${error.message}`);
            return [];
        });
};
