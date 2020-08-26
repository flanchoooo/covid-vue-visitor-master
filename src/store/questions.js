export default {
    namespaced: true,
    state     : {
        answers: [],

    },
    getters:{
        userAnswers(state){
           return state.answers
        }
    },
    mutations : {

        SET_ANSWER(state,answer){
            state.answers.push(answer);
        }
    },
    /* eslint-disable no-unused-vars */
    actions   : {
        async addAnswer({commit},answer) {
            return commit('SET_ANSWER',answer)
        },

    },
}
