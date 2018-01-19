/**
 * Created by haibalai on 2017/9/25.
 */
import Vue from 'vue';
import loginState from '../../../vuex/modules/login'
import {mapUIAccessTool} from '../MapUIAccessTool';
import {powerCodeData} from './PowerCodeData';




Vue.directive('powerCode', {
      isFn: true,
      acceptStatement: true,

      bind: function (el, binding) {
          //console.log(el,loginState,binding, mapUIAccessTool.vm.$router,powerCodeData.code,"llllllllllllllll");
           let bindval = binding.value;
           let code = bindval.code;
           if(!powerCodeData.code.includes(code))
           {
             el.style.display = "none"
           }
           let route = bindval.route;
           let routeArr = []
           if(route != undefined) {

               routeArr = route.split(':');
               let bool = isRouteCodeTrue(routeArr,mapUIAccessTool.getRoute());
               if(!bool)
                 el.style.display = "none";
             }

           if(route != undefined) {
             if(typeof(mapUIAccessTool.vm.$watch) != "function"){
               return;
             }
             mapUIAccessTool.vm.$watch('$route', () => {
               // console.log(el,loginState,binding, mapUIAccessTool.vm.$router,"llllllllllllllll");
               let bool = isRouteCodeTrue(routeArr,mapUIAccessTool.getRoute());
               if(!powerCodeData.code.includes(code))
               {
                 bool = false;
               }
               if(!bool) {
                 el.style.display = "none";
               }
               else{
                 el.style.display = "";
               }

             });
           }

      },
      update: function (el, binding) {


  },
      unbind: function () {
      }
})



function isRouteCodeTrue(routeArr,routePath) {
  // console.log(routeArr,routePath);
  let bool = false;
  for(let routerItem of routeArr)
  {
    // console.log(routerItem,"routerItem");
    if(routerItem.indexOf('&') != -1)
    {
       let routeItemArr =  routerItem.split('&');
       if(powerCodeData.code.includes(routeItemArr[0]) && routeItemArr[1] == routePath )
       {
          bool = true;
       }

    }
    else if(routerItem == routePath)
    {
      bool = true;
    }
  }
  // console.log(bool);
  return bool;

}




