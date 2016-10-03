'use strict';

const adminIndex = require.resolve('./assets/admin/index.html');
const BB = require('bluebird');
const chalk = require('chalk');
const createRoutes = require('express-json-middleware');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const grasshopperService = require('./services/grasshopper.service');


var grexpo = {
    start: start,
    services: null
};

module.exports = grexpo;

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

    grexpo.services = options.services || {};

    options.app.set('view engine', 'pug');

    return BB
        .bind({
            authenticatedRequest: null,
            grasshopper: null,
            options: options
        })
        .then(startGrasshopper)
        .then(serveStaticAdmin)
        .then(serveGrasshopperApi)
        .then(loadPlugins)
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
            // TODO: add on bridgetown and anything else useful

            grexpo.services.authenticatedRequest = this.authenticatedRequest;
            grexpo.services.grasshopper = this.grasshopper;
        });
}

function serveStaticAdmin() {
    const app = this.options.app;

    console.log(chalk.green('> serving static admin'));
    app.use(this.options.express.static(path.join(__dirname, 'assets'), this.options.staticOptions));
    app.use('/admin', function(req, res) { res.sendFile(adminIndex) });
}

function serveGrasshopperApi() {
    this.options.app.use('/api', this.grasshopper.router);
}

function loadPlugins() {
    const baseDirectory = this.options.baseDirectory;
    const plugins = require(path.join(baseDirectory, 'plugins.json'));

    plugins.forEach(plugin => {
        const pluginPath = path.join(baseDirectory, plugin.path);
        const index = require(pluginPath);

        console.log(chalk.green('> plugin path', pluginPath));

        if (index) {
            // TODO: wait if a promise is returned
            index();
        }
        // TODO: do not call these if there is no assets dir or routes.json
        serveAssetsForPlugin.call(this, pluginPath);
        loadRoutesForPlugin.call(this, pluginPath);
    });
}

function serveAssetsForPlugin(pluginPath) {
    console.log(chalk.green('> adding static dir to', path.join(pluginPath, 'assets')));
    this.options.app.use(this.options.express.static(path.join(pluginPath, 'assets'), this.options.staticOptions));
}

function loadRoutesForPlugin(pluginPath) {
    const routesFilePath = path.join(pluginPath, 'routes.json');
    const routes = require(routesFilePath);

    console.log(chalk.green('> routes file:'), routesFilePath);

    createRoutes({
        app : this.options.app,
        express : this.options.express,
        routes : routes,
        middlewares : pluginPath
    });
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
