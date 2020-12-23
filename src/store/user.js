import * as api from '../service/api'
import { Toast } from 'vant';
import Cookies from "js-cookie";

const state = {
    show: true,
    userToken: ''
}

const mutations = {
    changeShow(state, data) {
        state.show = data
    },
    setUserToken(state, data) {
        state.userToken = data
    },
}

const actions = {
    async getHomeDataFn({ commit }, data) {
        let res = await api.getHomeInitDataApi();
        if (res.data.code == 200) {
            commit('getHomeData', res.data.data);
        } else {
            Toast("服务器繁忙，请稍后重试");
        }
    },
    userRegisterFn({ commit }, data) {
        return new Promise((resolve, reject) => {
            api.userRegisterApi(data).then(res => {
                resolve(res);
            }, (error) => {
                Toast("服务器繁忙，请稍后重试");
                reject(error);
            })
        });
    },
    async userLoginFn({ commit }, data) {
        let callData = await api.userLoginApi(data);
        let res = callData.data;
        if (res.success) {
            commit('setUserToken', res.token);
            Cookies.set('token', res.token, { expires: 0.5 * 60 * 60 * 1000 })
        } else {
            Toast(res.mess);
        }
    }
}

const getters = {
    getToken: state => state.userToken,

}

export default {
    state,
    mutations,
    actions,
    getters
}