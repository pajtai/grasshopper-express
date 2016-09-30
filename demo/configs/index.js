'use strict';

const env = process.env.NODE_ENV;
const configVariables = require(`./vars/${env}`);

module.exports = function index() {
    return {
        port: 3008,
        verbose: configVariables.verbose,
        logger: {
            adapters : [{
                type : 'console',
                application : 'demo',
                machine : 'local'
            }]
        },
        grasshopper: {
            configs: {
                "assets": {
                    "default" : "local",
                    "tmpdir" : "/tmp",
                    "engines": {
                        "local": {
                            "path" : "/demo/this/should/work/with/a/relative/path",
                            "urlbase" : "http://localhost:3008/assets/"
                        }
                    }
                },
                "cache": {
                    "path": "./cache"
                },
                "crypto": {
                    "secret_passphrase" : "some-secret-passphrase"
                },
                "db": {
                    "type": "mongodb",
                    "defaultPageSize" : "10000",
                    "endpoint": `${configVariables.dbEndpointRoot}${configVariables.database}`,
                    "host": `${configVariables.dbEndpointRoot}${configVariables.database}`,
                    "database": configVariables.database,
                    "debug": configVariables.debug
            },
            "logger": {
                "adapters": [
                    {
                        "type": "console",
                        "application": "grasshopper-api",
                        "machine": "server"
                    }
                ]
            },
            "server" : {
                "proxy" : true
            },
            "grasshopperAdminPassword" : configVariables.grasshopperAdminPassword,
            "grasshopperAdminUsername" : configVariables.grasshopperAdminUsername
        }
        }
    }
};