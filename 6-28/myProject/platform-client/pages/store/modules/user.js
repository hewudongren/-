

const user = {
    state: {
        // token:"你好",// 用户登录后，将后台返回的token存本地，同步到store
        roles:[],
        userName: '',
    },
    getters:{
        token(state){
            return state.token
        },
        userName(state){
            return state.userName
        }

    },
    mutations: {
        // 登出
        logout (state, vm) {
            localStorage.removeItem("user")
            localStorage.clear();
        },
        //登录时保存token,保存到本地
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        //登录时保存角色
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        //登录时保存用户名
        SET_NAME: (state, name) => {
            state.name = name;
          },
    },
    actions:{
         // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const data = response.data;
                commit('SET_ROLES', data.role);
                commit('SET_NAME', data.name);
                // commit('SET_AVATAR', data.avatar);
                // commit('SET_UID', data.uid);
                // commit('SET_INTRODUCTION', data.introduction);
                resolve(response);
            }).catch(error => {
                reject(error);
            });
            });
        },
    }
};

export default user;
