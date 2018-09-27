'use strict';

const
    // Require 3rd-party modules:
    express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    layouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),

    // Require project modules:
    homeController = require('./controllers/home'),
    errorController = require('./controllers/error'),
    usersController = require('./controllers/users'),
    subscribersController = require('./controllers/subscribers'),
    coursesController = require('./controllers/courses'),

    // Initialize app object:
    app = express(),
    router = express.Router(),

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

router.use(methodOverride( '_method', {
    methods: [ 'POST', 'GET' ]
}));

// Routes:
// ----------------------------------------------------------------------------
// HOME:
router.get('/', homeController.index);
// USERS:
router.get('/users', usersController.index, usersController.indexView);
router.get('/users/new', usersController.new);
router.post('/users/create', usersController.create, usersController.redirectView);
router.get('/users/:id', usersController.show, usersController.showView);
router.get('/users/:id/edit', usersController.edit);
router.put('/users/:id/update', usersController.update, usersController.redirectView);
router.delete('/users/:id/delete', usersController.delete, usersController.redirectView);
// SUBSCRIBERS:
router.get('/subscribers', subscribersController.index, subscribersController.indexView);
router.get('/subscribers/new', subscribersController.new);
router.post('/subscribers/create', subscribersController.create, subscribersController.redirectView);
router.get('/subscribers/:id', subscribersController.show, subscribersController.showView);
router.get('/subscribers/:id/edit', subscribersController.edit);
router.put('/subscribers/:id/update', subscribersController.update, subscribersController.redirectView);
router.delete('/subscribers/:id/delete', subscribersController.delete, subscribersController.redirectView);
// COURSES:
router.get('/courses', coursesController.index, coursesController.indexView);
router.get('/courses/new', coursesController.new);
router.post('/courses/create', coursesController.create, coursesController.redirectView);
router.get('/courses/:id', coursesController.show, coursesController.showView);
router.get('/courses/:id/edit', coursesController.edit);
router.put('/courses/:id/update', coursesController.update, coursesController.redirectView);
router.delete('/courses/:id/delete', coursesController.delete, coursesController.redirectView);

app.use('/', router);

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
