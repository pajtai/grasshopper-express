'use strict';

const express = require('express');
const configs = require('./configs')();
const grexpo = require('../index');
const logger = require('solid-logger-js').init(configs.logger);

grexpo
    .start({
        app : express(),
        baseDirectory: __dirname,
        express: express,
        grasshopper: configs.grasshopper,
        grasshopperAdminPassword: configs.grasshopperAdminPassword,
        grasshopperAdminUsername: configs.grasshopperAdminUsername,
        port: configs.port,
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
