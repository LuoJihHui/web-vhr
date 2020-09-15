import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue';
import home from '../views/Home';
import test1 from '../views/Test1';
import test2 from '../views/Test2';

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
    }, {
        path: '/home',
        name: '导航菜单',
        component: home,
        children: [
            {
                path: '/test1',
                name: '选项卡1',
                component: test1
            }, {
                path: '/test2',
                name: '选项卡2',
                component: test2
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router
