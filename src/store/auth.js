export default {
    namespaced: true,
    state     : {
        token  : window.localStorage.getItem('token'),
        user   : window.localStorage.getItem('user'),
        company: window.localStorage.getItem('company'),

    },
    getters   : {
        authenticated(state) {
            return state.token && state.user;
        },
        user(state) {
            try {
                return JSON.parse(state.user);
            } catch (e) {
                return state.user
            }

        }
    },
    mutations : {
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_COMPANY(state, company) {
            state.company = company;
        }
    },
    /* eslint-disable no-unused-vars */
    actions   : {

        init(store) {

        },

        async userLogin({commit}, user) {
            return commit('SET_USER', user)

        },
        async userToken({commit}, token) {
            return commit('SET_TOKEN', token)

        },
        async userCompany({commit}, company) {
            return commit('SET_COMPANY', company)

        },
    },
}
