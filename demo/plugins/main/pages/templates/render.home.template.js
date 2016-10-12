'use strict';

const BB = require('bluebird');

module.exports = function mw(req, res, next) {

    BB
        .props(res.locals)
        .then(locals => {
            res.render(require.resolve('./home.template.pug'), locals);
        })
        .catch(next);
};