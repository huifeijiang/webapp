/**
 * Created by Administrator on 2017/7/16 0016.
 */
import * as type from '../mutations-type';

const state = {
    eventType	:'',
    locate      :'',
    textField   :'',
    latitude    :'',
    longitude   :'',
};

const getters = {
    eventType	   : state => state.user,
    locate         : state => state.password,
    getLatitude    : state => state.latitude,
    getLongitude    : state => state.longitude,
};

const actions = {
    setUser	   : ({ commit }) => commit( type.SET_USER ),
    setPassword: ({ commit }) => commit( type.SET_PASSWORD ),
    setLatitude: ({commit}, val) => commit(type.SET_LATITUDE, val),
    setLongitude:({commit}, val) => commit(type.SET_LONGITUDE, val),
};

const mutations = {
    [type.SET_USER] (state, str) {
        state.user = str;
    },
    [type.SET_PASSWORD] (state, str) {
        state.password = str;
    },
    [type.SET_LATITUDE] (state, str) {
        state.latitude = str;
    },
    [type.SET_LONGITUDE] (state, str) {
        state.longitude = str;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}