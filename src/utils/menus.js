import {getRequest} from "./api";
import menu from '../constant/menu'

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest(menu.initUrl).then(data => {
        if (data) {
            let forRoutes = formatRoutes(data.data);
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
                let path;
                if (component.startsWith("Emp")) {
                    path = "emp";
                } else if (component.startsWith("Per")) {
                    path = "per";
                } else if (component.startsWith("Sal")) {
                    path = "sal";
                } else if (component.startsWith("Sta")) {
                    path = "sta";
                } else if (component.startsWith("Sys")) {
                    path = "sys";
                }
                require(['../views/' + path + '/' + component + '.vue'], resolve);
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
