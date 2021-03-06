import axios from 'axios';
import {Notification} from 'element-ui';
import router from "../router";
import login from "../constant/login";

axios.interceptors.response.use(success => {
    /**
     * 业务错误
     */
    let status = success.status;
    let type = success.data.type;
    // 导出直接放行data数据
    if (type && type === 'application/vnd.ms-excel') {
        return success;
    }
    let code = success.data.code;
    let data = success.data.data;
    let msg = success.data.msg;
    if (status && status === 200 && code !== 0) {
        Notification.error(msg);
        return;
    }
    if (msg && msg !== 'success') {
        Notification.success(msg);
    }
    return data;
}, error => {
    let status = error.response.status;
    if (status === 504 || status === 404) {
        Notification.error('服务器被吃了o(╯□╰)o')
    } else if (status === 403) {
        Notification.error("权限不足,请联系管理员")
    } else if (status === 401) {
        Notification.error("尚未登录,请登录");
        router.replace(login.root);
    } else {
        let data = error.response.data.data;
        if (data) {
            Notification.error(data)
        } else {
            Notification.error("未知错误!")
        }
    }
    return;
});

/**
 * 预留统一url前缀
 * @date 2020/9/15 13:51
 * @author LuoJiaHui
 * @describe
 */
let base = '';

/**
 * 封装key-value传参
 * @date 2020/9/15 15:44
 * @author LuoJiaHui
 * @describe
 */
export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        // 拼接成key-value形式传参
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
};

/**
 * 封装json格式传参
 * @date 2020/9/15 15:44
 * @author LuoJiaHui
 * @describe
 */
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params
    });
};

export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    });
};

export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params,
        params: params
    });
};

export const delRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params
    });
};


export const ExportRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params,
        params: params,
        responseType: 'blob'
    });
};
