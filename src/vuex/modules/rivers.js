import * as type from '../mutations-type';

const state = {
    nowRiver: '',
    rivers: [],
    firstComing: true,
    selectedProject: '',
    showNav:true
}

const getters = {
    getRivers: state => state.rivers,
    getNowRiver: state => state.nowRiver,
    getProjectId: state => state.selectedProject,
    getShowNav  : state => state.showNav
}

const actions = {
    setRivers: ({commit}, val) => commit(type.SET_RIVERS, val),
    setNowRiver: ({commit}, val) => commit(type.SET_NOW_RIVER, val),
    setProjectId: ({commit}, val) => commit(type.SET_SELECTED_PROJECT, val),
}

const mutations = {
    [type.SET_RIVERS](state, val) {
        state.rivers = val
    },
    [type.SET_NOW_RIVER](state, val) {
        state.nowRiver = val
    },
    [type.SET_SELECTED_PROJECT](state, val) {
        state.selectedProject = val
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}