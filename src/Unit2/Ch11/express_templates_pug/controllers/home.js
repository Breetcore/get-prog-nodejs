'use strict';

module.exports = {
    respondByName: (req, res) => {
        let param = req.params.name;
        res.render(
            'index', { title: 'Ciao!', message : `Hallo, ${param}!` }
        );
    },
    sendContactDetails: (req, res) => {
        res.render(
            'contact', { title: 'Contact', details : 'Contact details' }
        );
    }
};
