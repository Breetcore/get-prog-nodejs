'use strict';

const
    // Require 3rd-party modules:
    express = require('express'),
    bodyParser = require('body-parser'),
    layouts = require('express-ejs-layouts'),
    mongoClient = require('mongodb').MongoClient,

    // Require project modules:
    homeController = require('./controllers/home'),
    errorController = require('./controllers/error'),

    // Initialize app object:
    app = express(),

    // Initialize database connection string parameters:
    dbUrl = 'mongodb://localhost:27017',
    dbName = 'recipe_db';

// Configuration:
app.set('host', process.env.address || '127.0.0.1');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

// Enable the serving of static files:
app.use(express.static('public'));

// 3rd-party middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(layouts);

// Routes:
app.get('/', homeController.showHome);
app.get('/courses', homeController.showCourses);
app.get('/contact', homeController.showSignUp);
app.post('/contact', homeController.postContactForm);

// Custom middleware:
//app.use(errorController.logErrors);
app.use(errorController.sendPageNotFoundError);
app.use(errorController.sendInternalServerError);

// Connect to database and verify it works:
mongoClient.connect(dbUrl, (error, client) => {
    if (error) throw error;
    let db = client.db(dbName);
    console.log(`Server connected successfully to database service: ${db.databaseName}`);
    db.collection('contacts')
        .find({name: 'Mauro Ebert'})
        .toArray((error, data) => {
            if (error) throw err;
            console.log(`Available DB data: ${JSON.stringify(data)}`);
        });
});

const server = app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
