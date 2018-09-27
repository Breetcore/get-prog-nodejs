'use strict';

module.exports = {
    index: (req, res) => {
        new Promise(resolve => { res.render('index'); }, reject => { console.log('[HOME]: Rendering "index" view rejected'); })
            .then(() => {
                console.log('[HOME]: View "index" rendered');
            })
            .catch(() => {
                console.log('[HOME]: Unexpected failure while rendering "index" view');
            }
        );
    },
};
