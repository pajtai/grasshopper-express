// main.js
var Vue = require('vue');
var App = require('./app.vue');
var app = new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    }
});
