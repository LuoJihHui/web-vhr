import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import {initMenu} from "./utils/menus";
import {delRequest, getRequest, postKeyValueRequest, postRequest, putRequest} from "./utils/api";
import login from './constant/login'

Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.delRequest = delRequest;
Vue.prototype.login = login;

Vue.use(ElementUI);
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
        // 其他页面加载菜单
        initMenu(router, store);
        next();
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
