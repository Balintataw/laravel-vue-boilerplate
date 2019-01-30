import axios from 'axios';

export default {
    login(payload) {
        return axios.post('admin/login', { email: payload.email, password: payload.password });
    },
    refreshToken() {
        return axios.post('admin/refresh');
    },
    logout() {
        return axios.post('admin/logout');
    },
    userInfo() {
        return axios.post('admin/me');
    },
    getReward(code) {
        return axios.get('pos/reward?code=' + code);
    },
    redeemReward(code) {
        return axios.post('pos/reward/redeem', {
            code: code,
        });
    },
    unredeemReward(code) {
        return axios.post('pos/reward/unredeem', {
            code: code,
        });
    },
}