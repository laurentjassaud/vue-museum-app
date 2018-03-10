import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import './directives'

new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
