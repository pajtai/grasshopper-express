'use strict';

const grexpo = require('../../../../../index');

module.exports = function head(req, res, next) {
    res.locals.head = grexpo.services.authenticatedRequest.content
        .query({
            filters : [
                {
                    key : 'fields.slug',
                    cmp : '=',
                    value : 'settings'
                }
            ],
            limit: 1
        })
        .then(docs => {
            return docs.results[0].fields;
        })
        .catch(next);

    next();
};