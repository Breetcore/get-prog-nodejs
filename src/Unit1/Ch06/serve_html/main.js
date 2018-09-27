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

const sendErrorResponse = (res) => {
    res.writeHead(httpStatus.NOT_FOUND, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>File Not Found!</h1>');
    res.end();
};

const customReadFile = (filePath, res) => {
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, (error, data) => {
            if (error) {
                console.log(error);
                sendErrorResponse(res);
                return;
            }
            res.write(data);
            res.end();
            console.log(`Response has been sent to ${res.socket.remoteAddress}:${res.socket.remotePort} with content:\n${data}`);
        });
    } else {
        sendErrorResponse(res);
    }
};

var server = http.createServer((req, res) => {
    console.log(`Incoming request from ${req.socket.localAddress}:${req.socket.localPort}`);

    let url = req.url;
    console.log(`Request URL is: ${url}`);

    if (url.indexOf('.html') !== -1) {
        res.writeHead( httpStatus.OK, {
            'Content-Type': 'text/html'
        });
        customReadFile(`./views${url}`, res);
    }
    else
        if (url.indexOf('.css') !== -1) {
            res.writeHead( httpStatus.OK, {
                'Content-Type': 'text/css'
            });
            customReadFile(`./public/css${url}`, res);
        }
        else if (url.indexOf('.png') !== -1) {
            res.writeHead( httpStatus.OK, {
                'Content-Type': 'image/png'
            });
            customReadFile(`./public/images${url}`, res);
        }
        else if (url.indexOf('.js') !== -1) {
            res.writeHead( httpStatus.OK, {
                'Content-Type': 'text/javascript'
            });
            customReadFile(`./public/js${url}`, res);
        }
    else {
            sendErrorResponse(res);
    }
});

server.listen(port, localhost, () => {
    console.log(`Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
