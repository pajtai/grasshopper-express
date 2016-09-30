'use strict';

const express = require('express');
const configs = require('./configs')();
const grexpo = require('../index');
const logger = require('solid-logger-js').init(configs.logger);

grexpo
    .start({
        configs: {

        },
        services: {
            logger: logger
        }
    })
    .then(function() {
        logger.debug('started');
    })
    .catch(function(e) {
        logger.error('startup error');
        logger.error(e);
    });
