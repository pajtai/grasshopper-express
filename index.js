'use strict';

const adminIndex = require.resolve('./public/admin/index.html');
const BB = require('bluebird');
const chalk = require('chalk');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const grasshopperService = require('./services/grasshopper.service');


module.exports = {
    start: start
};

/**
 *
 * @param {Object} options
 * @param {Object} options.express
 * @param {Object} options.app
 * @param {String} options.protocol
 * @param {Object} options.https
 * @param {String} options.https.key
 * @param {String} options.https.cert
 * @param {String} options.baseDirectory
 * @param {Boolean} options.verbose
 * @param {Object} options.grasshopper      Grasshopper configs
 * @param {Boolean} options.longStackTraces Whether to turn on bluebird longStackTraces
 * @param {Object} options.staticOptions options passed to express static middleware
 * @param {Object} options.configs global   Configs available as `require('grexpo').configs
 * @param {Object} options.services global  Services available as `require('grexpo').services
 * @returns {Promise} Resolves with the server
 */
function start(options) {

    options.protocol = options.protocol || 'http';
    options.staticOptions = options.staticOptions || { maxage : '365d' };

    return BB
        .bind({
            authenticatedRequest: null,
            grasshopper: null,
            options: options
        })
        .then(startGrasshopper)
        .then(serveStaticAdmin)
        .then(serveGrasshopperApi)
        .then(startServer)
        .then(function(server) {
            return {
                authenticatedRequest: this.authenticatedRequest,
                grasshopper: this.grasshopper,
                server: server
            }
        })
}

function startGrasshopper() {

    console.log(chalk.green('> starting grasshopper'));
    return BB
        .bind(this)
        .then(function() {
            return grasshopperService(this.options)
        })
        .then(function(serviceResponse) {
            this.authenticatedRequest = serviceResponse.authenticatedRequest;
            this.grasshopper = serviceResponse.grasshopper;
        });
}

function serveStaticAdmin() {
    const app = this.options.app;

    console.log(chalk.green('> serving static admin'));
    app.use(this.options.express.static(path.join(__dirname, 'public'), this.options.staticOptions));
    app.use('/admin', function(req, res) { res.sendFile(adminIndex) });
}

function serveGrasshopperApi() {
    this.options.app.use('/api', this.grasshopper.router);
}

function startServer() {
    const app = this.options.app;
    const baseDirectory = this.options.baseDirectory;
    const port = this.options.port;

    var server = null;



    if(this.options.protocol === 'https') {
        server = https.createServer({
            key: fs.readFileSync(path.join(baseDirectory, this.options.https.key)),
            cert: fs.readFileSync(path.join(baseDirectory, this.options.https.cert))
        }, app);
    } else {
        server = http.createServer(app);
    }

    server.listen(port, function(){
        console.log(chalk.green('> express app listening on port:'), port);
    });

    return server;
}
