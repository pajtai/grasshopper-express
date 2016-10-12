export default {
    data () {
        var dat = {
            msg: `Hello world!`,
            delta: 0
        };

        setInterval(() => {
            ++dat.delta;
            console.log(dat.delta);
        }, 1000);

        return dat;
    },
    computed: {
        time () {
            return this.delta;
        }
    }
};
