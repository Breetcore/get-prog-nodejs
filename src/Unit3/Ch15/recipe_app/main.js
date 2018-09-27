'use strict';

const
    // Require 3rd-party modules:
    express = require('express'),
    bodyParser = require('body-parser'),
    layouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),

    // Require project modules:
    homeController = require('./controllers/home'),
    errorController = require('./controllers/error'),
    subscribersController = require('./controllers/subscribers'),

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
app.get('/contact', subscribersController.getSubscribeForm);
app.get('/subscribers', subscribersController.getAllSubscribers);
app.post('/subscribe', subscribersController.subscribe);

// Custom middleware:
//app.use(errorController.logErrors);
app.use(errorController.sendPageNotFoundError);
app.use(errorController.sendInternalServerError);

// Let Mongoose know that we want to use native ES6 promises:
mongoose.Promise = global.Promise;
// Connect to database and verify it works:
mongoose.connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => {
    console.log(`Connection with database at ${db.host}:${db.port}/${db.name} established successfully`);
});

const server = app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
