'use strict';

const
    // Require 3rd-party modules:
    express = require('express'),
    bodyParser = require('body-parser'),
    layouts = require('express-ejs-layouts'),

    // Require project modules:
    homeController = require('./controllers/home'),
    errorController = require('./controllers/error'),

    // Initialize app object:
    app = express();

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

const server = app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
