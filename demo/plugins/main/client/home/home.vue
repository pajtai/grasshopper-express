<style lang="scss">
html, body {
    min-height: 100%;
}
body {
    background-color: #D0D1CB;
    background-image: url("/images/bicycle.jpg");
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: cover;
    color:#030303;
}
.jumbotron {
    background-color: transparent;
}
</style>

<template lang="pug">
.jumbotron
    h1 Welcome
    my-counter
    p
        a.btn.btn-primary.btn-lg(role="button") Click here
</template>

<script>
    import myCounter from '../my-counter/my-counter.vue';

    console.log('----------');
    export default {
        components : {
            myCounter
        }
    };
</script>