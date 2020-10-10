import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import {initMenu} from "./utils/menus";
import {delRequest, getRequest, postKeyValueRequest, postRequest, putRequest} from "./utils/api";
import login from './constant/login';
import basic from "./constant/sys/basic";
import 'font-awesome/css/font-awesome.min.css';
import menu from "./constant/menu";
import 'default-passive-events'

Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.delRequest = delRequest;
Vue.prototype.login = login;
Vue.prototype.basicUrl = basic;
Vue.prototype.menu = menu;

Vue.use(ElementUI, {size: 'medium'});
Vue.config.productionTip = false;

/**
 * 导航守卫-类似Spring的AOP
 * @date 2020/9/16 11:13
 * @author LuoJiaHui
 * @describe
 */
router.beforeEach((to, from, next) => {
    // 登录页放行
    if (to.path === '/') {
        next();
    } else {
        // 判断是否登录
        if (window.sessionStorage.getItem("user")) {
            // 其他页面加载菜单
            initMenu(router, store);
            next();
        } else {
            // 未登录,跳登录页
            next("/?redirect=" + to.path);
        }
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
