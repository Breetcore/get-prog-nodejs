'use strict';

const
    port = 3000,
    localhost = '127.0.0.1',
    http = require('http'),
    httpStatus = require('http-status-codes'),
    server = http.createServer();

const getJsonString = (obj) => {
    return JSON.stringify(obj, null, 2);
}

server.on('request', (request, response) => {
    console.log(`Incoming request from ${request.socket.localAddress}:${request.socket.localPort}`);

    var body = '';

    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        console.log(`Method: ${request.method}`);
        console.log(`URL: ${request.url}`);
        console.log(`Headers:\n${getJsonString(request.headers)}`);
        console.log(`Body: ${body.length ? `\n${body}` : 'empty'}`);
    });

    const responseMessage = '<h1>Hello Centric!</h1>';

    response.writeHead(httpStatus.OK, {
        'Content-Type': 'text/html'
    });
    response.end(responseMessage);
    console.log(`Response has been sent to ${response.socket.remoteAddress}:${response.socket.remotePort} with content: ${responseMessage}`);
});

server.listen(port, localhost, () => {
    console.log( `Server has started and is listening at: ${server.address().address}:${server.address().port}`);
});
