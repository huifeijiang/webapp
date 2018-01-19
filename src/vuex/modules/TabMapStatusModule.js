import * as type from '../mutations-type';

const state = {
    documentRiverObj	:{},
    buildTab            :'tab2',
    documentTab: 'tab1',

}

const getters = {
    getDocumentRiverObj	   : state => state.documentRiverObj,
    getBuildTab             : state => state.buildTab,
    getDocumentTab          : state => state.documentTab,
};

const actions = {
    setDocumentRiverObj	   : ({ commit },val) => commit( type.DOCUMENT_RIVER_NAME ,val),
    setBuildTab            : ({ commit },val) => commit( type.BUILD_TAB,val),
    setDocumentTab            : ({ commit },val) => commit( type.DOCUMENT_TAB,val),
};

const mutations = {
    [type.DOCUMENT_RIVER_NAME] (state, documentRiverObj) {
        state.documentRiverObj = documentRiverObj;
    },
    [type.BUILD_TAB] (state, buildTab) {
        state.buildTab = buildTab;
    },
    [type.DOCUMENT_TAB] (state, documentTab) {
        state.documentTab = documentTab;
    },


}

export default {
    state,
    getters,
    actions,
    mutations
}
