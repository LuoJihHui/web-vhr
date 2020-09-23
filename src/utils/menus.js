import {getRequest} from "./api";
import menu from '../constant/menu'

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest(menu.initUrl).then(data => {
        if (data) {
            let forRoutes = formatRoutes(data);
            router.addRoutes(forRoutes);
            store.commit('initRoutes', forRoutes);
        }
    });
};

export const formatRoutes = (routers) => {
    let fmRoutes = [];
    routers.forEach(router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            component(resolve) {
                if (component.startsWith("Home")) {
                    require(['../views/' + component + '.vue'], resolve);
                } else {
                    // 让数据库的组件名和前端组件名相同,拼接路径直接跳转即可
                    let s = component.substring(0, 3);
                    require(['../views/' + s.toLowerCase() + '/' + component + '.vue'], resolve);
                }
            },
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children
        };
        fmRoutes.push(fmRouter);
    });
    return fmRoutes;
};
