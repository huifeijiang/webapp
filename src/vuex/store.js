import Vue from 'vue';
import Vuex from 'vuex';
import rivers from './modules/rivers';
import login from './modules/login';
import form from './modules/form';
import mapModule from './modules/mapModule'
import  TabMapStatusModule from './modules/TabMapStatusModule'

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    login: login,
    form: form,
    rivers: rivers,
    mapModule: mapModule,
    TabMapStatusModule: TabMapStatusModule,
  }
})
