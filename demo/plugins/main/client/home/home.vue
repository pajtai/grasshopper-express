<style lang="scss">
$green: #00FF00;
.red {
    color: $green;
}
</style>

<template lang="pug">
div.stage
    my-counter
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