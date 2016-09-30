# grexpo
Grasshopper express polymer

grexpo is a framework you can use to build web apps with node. Both the
front and back end are included.

grexpo can be used to build a SPA (single page app) or multiple SPAs.

Please use Node 6+

## Nomenclature

Each SPA is called a Chapter.

A Chapter is made up of multiple Pages. Pages are loaded into Chapters
dynamically. Going from one Chapter to another triggers a page refresh.
Going from one Page to another within the same Chapter does not trigger
a page refresh. 

A Page is essentially a separate node app
with its own `package.json`. Certain dependencies like express and 
Grasshopper are injected into it.

Services are methods and objects shared within a Plugin, Bundle, or App.

## Philosophy
grexpo is designed to be used by teams of multiple people. The plugin
architecture allows different people to work on different plugins
independently.

## Structure

    app
        bin
            start
            watch
        configs
            vars
                staging.json
                production.json
            index.js
        chapters    
            sampleChapter
                samplePage
                    api
                        sample
                            sample.get.js
                            sample.get.spec.js
                            sample.model.js
                    assets
                        bower_components
                        images
                        src
                            sample-view.html
                        index.html (can also render index.pug)
                    bin
                        start
                        watch
                    middlewares
                    services
                        sample.service.js
                        sample.service.spec.js
                    bower.json
                    index.js
                    package.json
                    routes.json
        index.js
        
## Files and directories

### `/index.js`

You should call `config` first, and use the configs to build the start
options for grexpo.

Call `grexpo.start` from with the following options:

```
{
    express: express,
    app: app,
    baseDirectory: __dirname,
    verbose: true,
    grasshopper: grasshopper,
    longStackTraces: true,
    staticOptions: { maxage : '30d' },
    protocol: 'http',
    https: {
        key: key,
        cert: cert
    }
    
    configs: configs, // global configs available as `require('grexpo').configs
    services: services // global services available as `require('grexpo').services
}
```

### `/configs/index.js`

Suggested usage is to use NODE_ENV to conditionally require `./var/NODE_ENV` and
use the data returned to build your configs with ES6 template strings.

The return configs should include a `grasshopper` key with a value of a 
Grasshopper configuration object.



## Roadmap

Include ways to use sass and jade with Polymer.
Include ways to use jade on server side.
Include migrations.
