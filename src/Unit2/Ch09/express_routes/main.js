'use strict';

const
    express = require('express'),
    bodyParser = require('body-parser'),
    utils = require('./utils'),
    homeController = require('./controllers/home');

const
    app = express(),
    localhost = '127.0.0.1',
    port = 3000;

// Custom middleware:
//-------------------
// Since path defaults to “/”, middleware mounted without a path
// will be executed for every request to the app:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    utils.printReqDetails(req);
    next();
});

app.use('/items/:vegetable', (req, res, next) => {
    utils.printItemParam(req);
    next();
});

// Routes:
//-------------------
app.get('/', (req, res) => {
    homeController.sendHome(res);
});

app.get('/items', (req, res) => {
    homeController.sendItems(res);
});

app.get('/items/:vegetable', (req, res) => {
    homeController.sendReqParam(req, res);
});

app.post('/contact', (req, res) => {
    homeController.sendContactFeedback(res);
})

app.post('/signup', (req, res) => {
    homeController.signupProcessor(req, res);
});

const server = app.listen(port, localhost, () => {
    console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
