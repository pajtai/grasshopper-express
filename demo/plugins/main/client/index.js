// main.js
var Vue = require('vue');
var App = require('./home/home.vue');
var app = new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(App)
    }
});
