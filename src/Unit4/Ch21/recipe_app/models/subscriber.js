'use strict';

const mongoose = require('mongoose'),

    // Setting up subscriber model:
    subscriberSchema = mongoose.Schema({
        name: {
            first: {
                type: String,
                required: true,
                trim: true
            },
            last: {
                type: String,
                required: true,
                trim: true
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true
        },
        zipCode: {
            type: String,
            match: [/^([0-9]{4})( {0,1})([a-zA-Z]{2})$/, 'Invalid ZIP code'],
            trim: true
        },
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }]
    }, { timestamps: true });

// Add virtual (a.k.a. computed) attribute to schema:
subscriberSchema.virtual('fullName')
    .get(function () {
        return `${this.name.first} ${this.name.last}`;
    });

// Add methods to schema:
subscriberSchema.methods.getInfo = function () {
    return `Name: ${this.fullName} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

subscriberSchema.methods.findLocalSubscribers = function () {
    return this.model('Subscriber').find({ zipCode: this.zipCode }).exec();
};

module.exports = mongoose.model('Subscriber', subscriberSchema);
