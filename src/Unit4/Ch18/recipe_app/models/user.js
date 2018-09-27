const mongoose = require('mongoose'), Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true
        },
        last: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    zipCode: {
        type: String,
        match: [/^([0-9]{4})( {0,1})([a-zA-Z]{2})$/, 'Invalid ZIP code'],
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    subscribedAccount: { type: Schema.Types.ObjectId, ref: 'Subscriber' }
}, { timestamps: true });

// Add virtual (a.k.a. computed) attribute to schema:
userSchema.virtual('fullName')
    .get(function() {
        return `${this.name.first} ${this.name.last}`;
    }
);

module.exports = mongoose.model('User', userSchema);
