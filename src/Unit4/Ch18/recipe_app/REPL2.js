const
    mongoose = require('mongoose'),
    User = require('./models/user'),
    Subscriber = require('./models/subscriber');

mongoose.connect('mongodb://localhost:27017/recipe_db', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const userName = 'Mauro';
var testUser;

User.findOne({
    'name.first': userName
})
    .then((user) => console.log(`Removed ${user ? '1 record' : '0 records'}!`))
    .then(() => {
        return User.create({
            name: {
                first: 'Mauro',
                last: 'Ebert'
            },
            email: 'mauro.ebert@centric.eu',
            password: 'pass1234'
        })
    })
    .then(user => {
        console.log(`${user ? user.fullName : 'No users'} created!`)
        testUser = user;
        return Subscriber.findOne({
            email: user.email
        });
    })
    .then(subscriber => {
        testUser.subscriberAccount = subscriber;
        testUser.save();
    })
    .catch(error => console.log(error.message));
