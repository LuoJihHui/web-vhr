import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue';
import home from '../views/Home';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: login,
        hidden: true
    }, {
        path: '/home',
        name: 'Home',
        component: home,
        hidden: true
    }
];

const router = new VueRouter({
    routes
});

export default router
