// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {apiService} from './mian_url.js';
import Vue from 'vue'
import router from './router'
import store from './vuex/store';
import vueResource from 'vue-resource';
import App from './App'
import VueResource from 'vue-resource';
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.min.css'
import '../static/css/public.css'
import { DatetimePicker } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(DatetimePicker.name, DatetimePicker);
import { Swipe, SwipeItem } from 'mint-ui';
import powerCode from './gisComponets/HomeMap/directive/PowerCode.js';
import formValidate from './UIcomponents/autoForm/directive/FormValidate.js'
import {mapUIAccessTool} from './gisComponets/HomeMap/MapUIAccessTool'
import { Picker } from 'mint-ui';
import { Popup } from 'mint-ui';

Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.config.productionTip = false
// Vue.http.options.emulateJSON = true;
// Vue.http.options.crossOrigin = true;
// Vue.http.options.emulateHTTP = true;

Vue.use(MuseUI);
Vue.use(vueResource);


/* eslint-disable no-new */
var vm = new Vue({
    el: '#app-box',
    store,
    router,
    render: h => h(App),
});
mapUIAccessTool.vm  = vm;


vm.$router.push('/');

Vue.http.interceptors.push((request, next) => {
    request.headers.set('access-token', vm.$store.state.login.accessToken);

    // if (request.method == "POST") {
    //     if (vm.$store.state.login.accessToken) request.url += '?accessToken=' + vm.$store.state.login.accessToken;
    // }
    // if (request.body == null) {
    //     request.body = {}
    // }
    // request.body.accessToken = vm.$store.state.login.accessToken || '';
    // continue to next interceptor
    next((response) => {//在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
        if (response.body.code == '401') {
            vm.$router.push('/');
        }else if(response.status == 500){
            vm.$store.state.login.ShowTips = true
        }
        else {
            return response;
        }
    });
});

router.beforeEach((to, from, next) => {
   if(store.state.login.accessToken == null){
        next(false)
   }else{
        next();
   }
});


