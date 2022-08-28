import {createStore} from 'vuex'

const store = createStore({
    state() {
        return {
            // 登陆用户
            loginUser: null,
            // 文章列表
            postList: null
        }
    },
    mutations: {
        setLoginUser(state, loginUser) {
            state.loginUser = loginUser
        },
        setPostList(state, postList) {
            state.postList = postList
        }
    }
});

export default store;