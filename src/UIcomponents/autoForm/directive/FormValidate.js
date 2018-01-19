/**
 * Created by haibalai on 2017/11/3.
 */

import Vue from 'vue';
import {eventBus} from '../../../components/eventBus/eventBus';
import  {formCheckTool} from  '../tool/FormCheckTool';
import  {formErrorType} from  '../tool/FormErrorType';

Vue.directive('formValidate', {
  bind: function(el, binding, vnode, oldVnode)  {
    let bindval = binding.value;
    let item = binding.itemValue;
    eventBus.bus.addListener(eventBus.FORM_BLUR,(sendItem) =>{
      if(bindval.itemValue.formName ==  sendItem.formName){
        if(formCheckTool.checkNullError(formErrorType.NULLERROR,sendItem).flag){
          el.style.backgroundColor = "rgba(195, 206, 206, 0.43)"
        }
        else{
          el.style.backgroundColor = "rgba(0, 0, 0, 0)"
        }
      }
    })

  },
  update: function (el, binding, vnode, oldVnode) {

  },


})
