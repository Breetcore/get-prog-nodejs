const
    mongoose = require('mongoose'),
    Subscriber = require('../models/subscriber'),
    // Initialize database connection string parameters:
    dbUrl = 'mongodb://localhost:27017',
    dbName = 'recipe_db';

// Let Mongoose know that we want to use native ES6 promises:
mongoose.Promise = global.Promise;
// Connect to database and verify it works:
mongoose.connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => {
    console.log(`Connection with database at ${db.host}:${db.port}/${db.name} established successfully`);
});

var contacts = [{
    name: 'Mauro',
    surname: 'Ebert',
    email: 'mauro.ebert@gmail.com',
    zipCode: '2805 KB'
},
{
    name: 'Nicole',
    surname: 'Geradts',
    email: 'nicole.geradts@gmail.com',
    zipCode: '2805 KB'
},
{
    name: 'Alberto',
    surname: 'Aresu',
    email: 'alberto.aresu@langolodivino.com',
    zipCode: '2801 KA'
}];

Subscriber.remove({})
    .exec()
    .then(() => {
        console.log('[COLLECTION] Subscribers is now empty');
    });

var commands = [];

contacts.forEach((contact) => {
    commands.push(Subscriber.create({
        name: contact.name,
        surname: contact.surname,
        email: contact.email,
        zipCode: contact.zipCode
    }));
});

Promise.all(commands)
    .then(result => {
        console.log(`[COLLECTION]: New subscriber data added\n${JSON.stringify(result)}`);
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`[ERROR]:\n${error}`);
    });
