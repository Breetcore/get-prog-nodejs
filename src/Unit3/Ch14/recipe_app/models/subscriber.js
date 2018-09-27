'use strict';

const
    mongoose = require('mongoose'),

    // Setting up subscriber model:
    subscriberSchema = mongoose.Schema({
        name: String,
        email: String,
        zipCode: Number
    });

module.exports = mongoose.model('Subscriber', subscriberSchema);
