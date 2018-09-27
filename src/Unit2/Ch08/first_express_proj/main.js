'use strict';

const
    express = require('express'),
    app = express(),
    localhost = '127.0.0.1',
    port = 3000;

app.get('/', (req, res) => {
    console.log(`Request method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    console.log(`Request params: ${JSON.stringify(req.params)}`);
    console.log(`Request query: ${JSON.stringify(req.query)}`);
    console.log(`Request body:\n${JSON.stringify(req.body)}`);
    res.send('Home Page');
});

app.post('/contact', (req, res) => {
    console.log(`Request method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    console.log(`Request params: ${JSON.stringify(req.params)}`);
    console.log(`Request query: ${JSON.stringify(req.query)}`);
    console.log(`Request body:\n${JSON.stringify(req.body)}`);
    res.send('Contact information submitted successfully');
})

const server = app.listen(port, localhost, () => {
        console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
    });
