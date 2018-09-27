'use strict';

const
    http = require('http'),
    httpStatus = require('http-status-codes'),
    fs = require('fs');

const
    localhost = '127.0.0.1',
    port = 3000;

const getViewUrl = (url) => {
    console.log(`URL is: ${url}`);
    return `views${url === '/' ? url + 'index.html' : url + '.html'}`;
};

var server = http.createServer((req, res) => {
    console.log(`Incoming request from ${req.socket.localAddress}:${req.socket.localPort}`);

    let viewUrl = getViewUrl(req.url);
    console.log(`URL after reworking is: ${viewUrl}`);
    
    fs.readFile(viewUrl, (error, data) => {
        if (error) {
            res.writeHead(
                httpStatus.NOT_FOUND, {
                    'Content-Type': 'text/html'
            });
            res.write('<h1>FILE NOT FOUND</h1>');
        }
        else {
            res.writeHead(
                httpStatus.OK, {
                    'Content-Type': 'text/html'
                }
            );
            res.write(data);
        }
        res.end();

        console.log(`Response has been sent to ${res.socket.remoteAddress}:${res.socket.remotePort} with content:\n${data}`);
    });
});

server.listen(port, localhost, () => {
    console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
