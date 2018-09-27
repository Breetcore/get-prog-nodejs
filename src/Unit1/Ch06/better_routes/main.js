'use strict';

const
    http = require('http'),
    httpStatus = require('http-status-codes'),
    fs = require('fs'),
    router = require('./router');

const
    localhost = '127.0.0.1',
    port = 3000;

const
    plainTextContentType = { 'Content-Type': 'text/plain' },
    htmlContentType = { 'Content-Type': 'text/html' },
    jsonContentType = { 'Content-Type': 'application/json' };

const customReadFile = (file, res) => {
    fs.readFile(`./${file}`, (error, data) => {
        if (error) {
            console.log('Error reading the file');
        }
        res.end(data);
    });
};

router.get('/', (req, res) => {
    res.writeHead(httpStatus.OK, plainTextContentType);
    res.end('INDEX');
});

router.get('/home', (req, res) => {
    res.writeHead(httpStatus.OK, htmlContentType);
    customReadFile('views/index.html', res);
});

router.get('/index', (req, res) => {
    res.writeHead(httpStatus.OK, htmlContentType);
    customReadFile('views/index.html', res);
});

router.get('/index.html', (req, res) => {
    res.writeHead(httpStatus.OK, htmlContentType);
    customReadFile('views/index.html', res);
});

router.get('/hello', (req, res) => {
    res.writeHead(httpStatus.OK, htmlContentType);
    customReadFile('views/hello.html', res);
});

router.get('/hello.html', (req, res) => {
    res.writeHead(httpStatus.OK, htmlContentType);
    customReadFile('views/hello.html', res);
});

router.post('/', (req, res) => {
    res.writeHead(httpStatus.OK, plainTextContentType);
    res.end('POSTED');
});

router.post('/user', (req, res) => {
    console.log('Incoming POST');
    var payload = '';
    req.on('data', (chunk) => {
        payload += chunk.toString();
        console.log(payload);
    });
    res.writeHead(httpStatus.CREATED, plainTextContentType);
    res.end('DATA POSTED');
});

var server = http.createServer(router.handle).listen(port, localhost, () => {
    console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
