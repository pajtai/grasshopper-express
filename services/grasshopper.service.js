'use strict';

const api = require('grasshopper-api');
const BB = require('bluebird');
const chalk = require('chalk');

module.exports = grasshopperService;


function grasshopperService(options) {
    const grasshopper = api(options.grasshopper);

    console.log(chalk.green('> start about to be called'));
    return new BB(function(resolve, reject) {
        grasshopper
            .core.event.channel('/system/db')
            .on('start', function(payload, next){
                console.log(chalk.green('> start event received'));
                grasshopper
                    .core.auth('basic', {
                        username: options.grasshopperAdminUsername,
                        password: options.grasshopperAdminPassword
                    })
                    .then(function(token) {
                        console.log(chalk.green('> grasshopper authenticated'));
                        resolve({
                            authenticatedRequest: grasshopper.core.request(token),
                            grasshopper: grasshopper
                        });
                        next();
                    })
                    .catch(reject);
            });
    });
}
