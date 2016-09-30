# grexpo
Grasshopper express polymer

grexpo is a framework you can use to build web apps with node. Both the
front and back end are included.

grexpo can be used to build a SPA (single page app) or multiple SPAs.

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
                    assets
                        bower_components
                        index.html
                    bin
                        start
                        watch
                    services
                    bower.json
                    index.js
                    package.json
                    routes.json
        

