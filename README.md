# grexpo
Grasshopper express polymer

grexpo is a framework you can use to build web apps with node. Both the
front and back end are included.

grexpo can be used to build a SPA (single page app) or multiple SPAs.

Please use Node 6+

## Nomenclature

Each SPA is called a Chapter.

A Plugin is a feature.

One type of feature is a SPA. In this case, a Plugin is made up of multiple Pages. Pages are loaded into Plugins
dynamically. Going from one Plugin to another triggers a page refresh.
Going from one Page to another within the same Plugin does not trigger
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
        plugins    
            samplePlugin
                api
                    sample
                        sample.get.js
                        sample.get.spec.js
                        sample.model.js
                assets
                    bower_components
                    images
                    pages
                        home-page.html
                        about-page.html
                    fragments
                        banner-fragment.html
                        footer-fragment.html
                    views
                        button-view.html
                        table-view.html
                bin
                    start
                    watch
                middlewares
                services
                    sample.service.js
                    sample.service.spec.js
                bower.json
                index.pug
                index.js
                package.json
                routes.json
        index.js
        plugins.json
        
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
    grasshopperAdminPassword: '...',
    grasshopperAdminUsername: '...',
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

Use bootstrap or other as sass import
Convert over to webpack
Create dev and build webpacks
Should see what grexpo loaded in console and create an discovery endpoint
What for plugin/index.js if it returns a promise.
Make plugins.json optionally come from a db
Include ways to use sass and jade with Polymer.
Include ways to use jade on server side.
Include migrations.

SEO tags out of the box (OG, ....)
TagManager
Sitemap
