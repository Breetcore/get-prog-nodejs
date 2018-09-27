'use strict';

const
    port = 3000,
    localhost = '127.0.0.1',
    http = require('http'),
    httpStatus = require('http-status-codes'),
    app = http.createServer((request, response) => {
        console.log(`Incoming request from ${request.socket.localAddress}`);
        response.writeHead(httpStatus.OK, {
            'Content-Type': 'text/html'
        });

        const responseMessage = '<h1>Hello Centric!</h1>';
        response.write(responseMessage);
        response.end();
        console.log(`Response has been sent with content: ${responseMessage}`);
    });

app.listen(port, localhost, () => {
    console.log( `Server has started and is listening at: ${app.address().address}:${app.address().port}`);
});
