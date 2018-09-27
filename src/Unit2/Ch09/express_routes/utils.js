'use strict';

module.exports = {
    printReqDetails: (req) => {
        console.log(`Request method: ${req.method}`);
        console.log(`Request URL: ${req.url}`);
        console.log(`Request params: ${JSON.stringify(req.params)}`);
        console.log(req.query);
        console.log(`Request query: ${JSON.stringify(req.query)}`);
        console.log(req.body);
        console.log(`Request body:\n${JSON.stringify(req.body)}`);
    },
    printItemParam: (req) => {
        console.log(`Item param: ${JSON.stringify(req.params.vegetable)}`);
    }
};
