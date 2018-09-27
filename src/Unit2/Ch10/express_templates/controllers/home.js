'use strict';

module.exports = {
    respondByName: (req, res) => {
        res.render(
            'index', { name : req.params.name }
        );
    },
    sendContactDetails: (req, res) => {
        res.render(
            'contact', { details : 'Contact details' }
        );
    }
};
