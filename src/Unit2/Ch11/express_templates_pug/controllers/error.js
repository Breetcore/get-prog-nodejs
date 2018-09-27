'use strict';

const httpStatus = require('http-status-codes');

const getOptions = () => {
    let options = {
        root: './public',
        dotfiles: 'deny',
        headers: {
            'Content-Type': 'text/html',
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };
    return options;
}

module.exports = {
    logErrors: (errors, req, res, next) => {
        console.error(error.stack);
        next(error);
    },
    respondNoResourceFound: (req, res, next) => {
        let errorCode = httpStatus.NOT_FOUND;
        res.status(errorCode);
        let fileName = '404.html';
        res.sendFile(`./${fileName}`, getOptions(), (err) => {
            if (err) { next(err); }
            else { console.log(`Sent: ${fileName}`)}
        });
    },
    respondInternalError: (errors, req, res, next) => {
        let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
        console.log(`ERROR occurred:\n${errors.stack}`);
        res.status(errorCode);
        let fileName = '500.html';
        res.sendFile(`./${fileName}`, getOptions(), (err) => {
            if (err) { next(err); }
            else { console.log(`Sent: ${fileName}`)}
        });
    },
}