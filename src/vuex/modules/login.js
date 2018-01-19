import * as type from '../mutations-type';

const state = {
    //登录后获取的token
    accessToken: null,
    //角色：0为普通，只有巡查和个人；1为管理员，拥有完整版。
    role: 0,
    name: '',
    tel: '',
    status: '',
    normalStatus: '开始办理',
    userId:null,
    loginpassword:'',
    code:[],
    roleName:'',
    street: '',
    Headportrait:"static/v2images/touxiang.png",
    ShowTips:false

};

const getters = {
    getloginpassword : state => state.loginpassword,
    getToken: state => state.accessToken,
    getRole: state => state.role,
    getUserName: state => state.name,
    getTel: state => state.tel,
    getUserStatus: state => state.status,
    getNormalStatus : state => state.normalStatus,
    getUserId: state => state.userId,
    getCode: state => state.code,
    getJueSe: state => state.roleName,
    getStreet: state => state.street,
    getHead : state => state.Headportrait,
    getShowTips :state => state.ShowTips
};

const actions = {
    setShowTips: ({commit}, val) => commit(type.SET_SHOWTIPS, val),
    setToken: ({commit}, val) => commit(type.SET_TOKEN, val),
    setRole: ({commit}, val) => commit(type.SET_ROLE, val),
    setUserName: ({commit}, val) => commit(type.SET_USERNAME, val),
    setTel: ({commit}, val) => commit(type.SET_USER_TEL, val),
    setUserStatus: ({commit}, val) => commit(type.SET_USER_STATUS),
    setNormalStatus:({ commit }, val) => commit(type.SET_USER_NORMAL,val),
    setUserId:({ commit }, val) => commit(type.SET_USERID, val),
    setloginpassword:({ commit }, val) => commit(type.SET_LOAGINPASSWORD, val),
    setCode:({commit}, val) => commit(type.SET_CODE, val),
    setRolename:({commit}, val) => commit(type.SET_ROLENAME, val),
    setStreet:({commit}, val) => commit(type.SET_STREET, val),
    setHead :({commit}, val) => commit(type.SET_HEADPORT, val)
};

const mutations = {

    [type.SET_SHOWTIPS](state, val){
        state.ShowTips = val;
    },
    [type.SET_HEADPORT](state, val){
        state.Headportrait = val;
    },
    [type.SET_LOAGINPASSWORD](state, val){
        state.loginpassword = val;
    },
    [type.SET_TOKEN] (state, val) {
        state.accessToken = val;
    },
    [type.SET_ROLE] (state, val){
        state.role = val;
    },
    [type.SET_USERNAME] (state, val){
        state.name = val;
    },
    [type.SET_USER_TEL] (state, val){
        state.tel = val;
    },
    [type.SET_USER_STATUS] (state, val){
        state.status = val;
    },
    [type.SET_USER_NORMAL] (state, val){
        state.normalStatus = val;
    },
    [type.SET_USERID] (state, val){
        state.userId = val;
    },
    [type.SET_CODE] (state, val){
        state.code = val;
    },
    [type.SET_ROLENAME] (state, val){
        state.roleName = val;
    },
    [type.SET_STREET] (state, val) {
        state.street = val;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}