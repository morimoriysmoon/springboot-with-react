let vm = null;

$(function () {
    vm = new Vue({
        el: '#app',
        data() {
            return {
                page_title: 'MOMENTON CODING CHALLENGE',
                show_title: false,
                ceo: {}
            }
        },
        mounted: function () {
            axios.get('/employee/all').then(function (res) {
                vm.ceo = res.data;
            });
        },
        methods: {}
    });
});