'use strict';

const
    express = require('express'),
    layouts = require('express-ejs-layouts');
const
    home = require('./controllers/home');
const
    app = express();

// Configuration:
app.set('host', process.env.address || '127.0.0.1');
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');

// Custom middleware:
app.use(layouts);

// Routes:
app.get('/name/:name', (req, res) => {
    home.respondByName(req, res);
})

app.get('/contact', (req, res) => {
    home.sendContactDetails(req, res);
})

const server = app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
