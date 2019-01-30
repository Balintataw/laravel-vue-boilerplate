import Vue from 'vue'
import Vuex from 'vuex'
// import Storage from 'vue-web-storage';
import request from '../requests';

Vue.use(Vuex);
// Vue.use(Storage, {
//     prefix: 'sfr_',
//     driver: 'local',
// });

function errorParse(error) {
    let errMessage = "";

    if (error.response.data) {
        if (error.response.data.error) {
            errMessage = error.response.data.error;
        } else if (typeof error.response.data == "object") {
            let errors = error.response.data;
            Object.keys(errors).forEach((err) => {
                console.log({err, errors, email: errors[err]});
                for (let m = 0; m < errors[err].length; m++) {
                    console.log(m);
                    errMessage += errors[err][m] + " ";
                }
            });
        } 
    }

    return errMessage;
}

export default new Vuex.Store({
    state: {
        // token: {
        //     access_token: Vue.$localStorage.get('token_access_token'),
        //     expires_in: Vue.$localStorage.get('token_expires_in'),
        //     token_type: Vue.$localStorage.get('token_token_type'),
        // },
        user: {
            id: null,
            first_name: null,
            last_name: null,
            email: null,
            phone: null,
            subscription: false,
            created_at: "",
            updated_at: ""
        }
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = {...payload};
        },
        SET_USER_SUBSCRIPTION(state, payload) {
            state.user.subscription = payload;
        },
        // SET_TOKEN(state, payload) {
        //     Vue.$localStorage.set('token_access_token', payload.access_token);
        //     Vue.$localStorage.set('token_expires_in', payload.expires_in);
        //     Vue.$localStorage.set('token_token_type', payload.token_type);

        //     state.token = {...payload};
        // },
        // CLEAR_TOKEN(state) {
        //     Vue.$localStorage.remove('token_access_token');
        //     Vue.$localStorage.remove('token_expires_in');
        //     Vue.$localStorage.remove('token_token_type');
        //     state.token.access_token = null;
        //     state.token.expires_in = null;
        //     state.token.token_type = null;
        // },
        CLEAR_USER(state) {
            for (let prop in state.user) {
                state.user[prop] = null;
            }
        },
    },
    actions: {
        login({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.login(payload).then(response => {
                    console.log("Login: ", response);
                    // commit('SET_TOKEN', response.data);
                    commit('SET_USER', response.data)
                    resolve('Got user info');
                }).catch(error => {
                    console.log("Login error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        register({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.register(payload).then(response => {
                    console.log("Registered: ", response);
                    // commit('SET_TOKEN', response.data);
                    resolve('Got user info');
                }).catch(error => {
                    console.log("Register error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        refreshToken({ commit, state, dispatch }) {
            let p = new Promise((resolve, reject) => {
                // if (state.token.access_token) {
                //     request.refreshToken().then(response => {
                //         console.log('Refreshed token: ', response);

                //         commit('SET_TOKEN', response.data);
                //         resolve('Successfully refreshed token');

                //         setTimeout(() => {
                //             dispatch('refreshToken');
                //         }, (response.data.expires_in - 1) * 1000);

                //     }).catch(error => {
                //         console.log("Refresh token error: ", error);
                //         commit('CLEAR_TOKEN');
                //         reject(error);
                //     });
                // } else {
                    let e = new Error('Token not set');
                    reject(e);
                // }
            });

            return p;
        },
        logout({ commit }) {
            let p = new Promise((resolve, reject) => {
                request.logout().finally(() => {
                    commit('CLEAR_TOKEN');
                    commit('CLEAR_USER');
                }).finally(() => {
                    resolve('Logged out');
                });
            });

            return p;
        },
        userInfo({ commit }) {
            let p = new Promise((resolve, reject) => {
                request.userInfo().then(response => {
                    console.log("me, ", response);
                    commit('SET_USER', response.data);
                    resolve('Got user info');
                }).catch(error => {
                    console.log("Get user error: ", error);
                    commit('CLEAR_TOKEN');
                    commit('CLEAR_USER');
                    reject(error);
                });
            });

            return p;
        },
        userSubscription({ commit }) {
            let p = new Promise((resolve, reject) => {
                request.userSubscription().then(response => {
                    commit('SET_USER_SUBSCRIPTION', response.data);
                    resolve(response.data);
                }).catch(error => {
                    console.log("Get user subscription error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        userSubscriptionUpdate({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.userSubscriptionUpdate(payload).then(response => {
                    commit('SET_USER_SUBSCRIPTION', response.data);
                    resolve(response.data);
                }).catch(error => {
                    console.log("Get user subscription error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        userUpdate({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.userUpdate(payload).then(response => {
                    console.log("update, ", response);
                    commit('SET_USER', response.data);
                    resolve('Updated user info');
                }).catch(error => {
                    console.log("Update user error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        userPasswordUpdate({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.userPasswordUpdate(payload).then(response => {
                    console.log("update password, ", response);
                    resolve('Updated password');
                }).catch(error => {
                    console.log("Update user error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        userRewardsGet({ commit }) {
            let p = new Promise((resolve, reject) => {
                request.userRewardsGet().then(response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(errorParse(error));
                });
            });

            return p;
        },
        saleableRewardsGet({ commit }) {
            let p = new Promise((resolve, reject) => {
                request.saleableRewardsGet().then(response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(errorParse(error));
                });
            });

            return p;
        },
        saleableRewardsPurchase({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.saleableRewardsPurchase(payload).then(response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(errorParse(error));
                });
            });

            return p;
        },
        userRewardsRequest({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.userRewardsRequest(payload).then(response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(errorParse(error));
                });
            });

            return p;
        },
        recoverPassword({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.recoverPassword(payload).then(response => {
                    console.log('Recovery email requested', response);
                    resolve('Successful request');
                }).catch(error => {
                    console.log("Recover password error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        resetPassword({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.resetPassword(payload).then(response => {
                    console.log("Password reset: ", response);
                    commit('SET_TOKEN', response.data);
                    resolve('Password was reset');
                }).catch(error => {
                    console.log("Password reset error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
        signup({ commit }, payload) {
            let p = new Promise((resolve, reject) => {
                request.signup(payload).then(response => {
                    console.log("Signup: ", response);
                    resolve('Signup success');
                }).catch(error => {
                    console.log("Signup error: ", error);
                    reject(errorParse(error));
                });
            });

            return p;
        },
    },
    getters: {
        // isLoggedIn: state => (state.token.access_token ? true : false),
        // token: state => state.token.access_token,
    },
});
