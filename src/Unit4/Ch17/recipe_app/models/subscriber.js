'use strict';

const
    mongoose = require('mongoose'),

    // Setting up subscriber model:
    subscriberSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        zipCode: {
            type: String,
            match: [/^([0-9]{4})( {0,1})([a-zA-Z]{2})$/, 'Invalid ZIP code']
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }]
    });

subscriberSchema.methods.getInfo = function() {
    return `Name: ${this.name} ${this.surname} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function() {
    return this.model('Subscriber').find({ zipCode: this.zipCode }).exec();
};

module.exports = mongoose.model('Subscriber', subscriberSchema);
