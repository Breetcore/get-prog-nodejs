'use strict';

const
    mongoose = require('mongoose'),

    // Setting up subscriber model:
    subscriberSchema = mongoose.Schema({
        name: String,
        surname: String,
        email: String,
        zipCode: String
    });

module.exports = mongoose.model('Subscriber', subscriberSchema);
