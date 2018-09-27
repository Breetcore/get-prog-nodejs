'use strict';

const
    // Require 3rd-party modules:
    express = require('express'),
    // Require project modules:
    home = require('./controllers/home'),
    // Initialize app object:
    app = express();

// Configuration:
app.set('host', process.env.address || '127.0.0.1');
app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'pug');

// Routes:
app.get('/', function (req, res) {
    res.render('index', { title: 'Welcome!', message: 'Layout works' });
});

app.get('/name/:name', (req, res) => {
    home.respondByName(req, res);
})

app.get('/contact', (req, res) => {
    home.sendContactDetails(req, res);
})

const server = app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
