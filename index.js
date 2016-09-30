'use strict';

const adminIndex = require.resolve('./public/admin/index.html');
const BB = require('bluebird');
const path = require('path');


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
 * @returns {Promise}
 */
function start(options) {

    options.staticOptions = options.staticOptions || { maxage : '365d' };

    return BB
        .bind({
            options: options
        })
        .then(serveStaticAdmin)
        .then(startServer)
}

function serveStaticAdmin() {
    const app = this.options.app;

    app.use(this.options.express.static(path.join(__dirname, 'public'), this.options.staticOptions));
    app.use('/admin', function(req, res) { res.sendFile(adminIndex) });
}

function startServer() {
    var port = this.options.port,
        server = null;

    if(this.options.protocol === 'https') {
        server = https.createServer({
            key: fs.readFileSync(path.join(baseDirectory, storedConfigs.https.key)),
            cert: fs.readFileSync(path.join(baseDirectory, storedConfigs.https.cert))
        }, app);
    } else {
        server = http.createServer(app);
    }

    server.listen(port, function(){
        console.log(chalk.green('> express app listening on port:'), port);
    });

    return server;
}
