'use strict';

const httpStatus = require('http-status-codes');

module.exports = {
    sendPageNotFoundError: (req, res, next) => {
        let errorCode = httpStatus.NOT_FOUND;
        res.status(errorCode);
        res.render('partials/error', { errorMessage: 'Oops! Something went wrong, or the page you are looking for is not available.' });
    },
    sendInternalServerError: (error, req, res, next) => {
        let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
        console.log(`ERROR occurred: ${error.stack}`)
        res.status(errorCode);
        res.render('partials/error', { errorMessage: 'Sorry, our application is taking a nap!' });
    }
};
