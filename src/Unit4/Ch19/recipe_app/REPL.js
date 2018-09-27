const mongoose = require( 'mongoose' ), User = require('./models/user'), Subscriber = require( './models/subscriber' ), Course = require( './models/course' );
mongoose.connect('mongodb://localhost:27017/recipe_db', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

let testUser;

User.create({ name: { first: 'Mauro', last: 'Ebert ' }, email: 'mauro.ebert@centric.eu', password: 'pass1234' }).then(user => testUser = user).catch(error => console.log(error.message));
