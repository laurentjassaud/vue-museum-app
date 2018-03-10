import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import ListReferences from '@/components/ListReferences.vue'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    linkActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            name: 'home-category',
            path: '/references/:category',
            component: ListReferences
        }      
    ]
})

router.beforeEach((to, from, next) => {
    // Toggle mobile nav
    if (document.querySelector('.nav__hamburger--active')) {
        document.querySelector('.nav__hamburger').classList.remove('nav__hamburger--active')
        document.querySelector('.nav__list').classList.remove('nav__list--active')
    }
    next()
})

export default router
