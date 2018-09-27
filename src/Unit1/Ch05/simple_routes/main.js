'use strict';


const routeResponseMap = {
    '/info': '<h1>Info page</h1>',
    '/contact': '<h1>Contact us</h1>',
    '/about': '<h1>Learn more about us</h1>',
    '/hello': '<h1>Say hello by emailing us <a href="mailto:mauro.ebert@gmail.com">here</a></h1>',
    '/error': '<h1>Sorry, the page you are looking for is apparently not available at the moment.</h1>'
};

const
    port = 3000,
    localhost = '127.0.0.1',
    http = require('http'),
    httpStatus = require('http-status-codes'),
    app = http.createServer((request, response) => {
        console.log(`Incoming request from ${request.socket.localAddress}`);

        response.writeHead(
            request.url === '/error' ? httpStatus.NOT_FOUND : httpStatus.OK,
            {
                'Content-Type': 'text/html'
            }
        );

        var content = routeResponseMap[request.url];

        if (content) {
            response.end(content);
            console.log(`Response has been sent with content: ${content}`);
        }
        else {
            const responseMessage = '<h1>Hello Centric!</h1>';
            setTimeout(() => {
                response.write(responseMessage);
                response.end();
                console.log(`Response has been sent with content: ${responseMessage}`);
            }, 2000);
        }
    });

app.listen(port, localhost, () => {
    console.log(`Server has started and is listening at: ${app.address().address}:${app.address().port}`);
});
