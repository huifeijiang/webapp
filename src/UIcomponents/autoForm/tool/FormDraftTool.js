/**
 * 草稿操作类
 * Created by haibalai on 2017/10/30.
 */
import {formFillTool} from './FormFillTool'
import {eventBus} from '../../../components/eventBus/eventBus'
export const formDraftTool = {};

/**
 * 根据草稿类型 和id获取草稿对象
 * @param draftName
 * @param id
 * @returns {*}
 */
//{zaiguanlist:{zaigaun-1:[],zaiguan-2:[]}}
formDraftTool.getDraftByNameAndId = function (draftName, id,draftType) {
  if (localStorage.draftIdMap != undefined) {
    let draftIdMap = JSON.parse(localStorage.draftIdMap);
    if (draftIdMap[draftName]) {
      let idHash = draftIdMap[draftName];
      if(draftType == '1'){
         for(let key in idHash){
           let val = key.split('-')[0];
           if(val == id){
             return idHash[key];
           }
         }
      }else{
        if (idHash[id]) {
          let formData = formFillTool.formClone(idHash[id]);
          return formData;
        }else{
          return idHash;
        }
      }
    }
  }
  return null;
}

/**
 * 设置草稿对象
 * @param draftName
 * @param id
 * @param formData
 */
formDraftTool.setDraftByNameAndId = function (draftName, id, formData,draftType) {
  if (draftName == "") {
    return;
  }
  let newFormData = formFillTool.formClone(formData);
  let guid = "";
  if(draftType == '1'){
    guid = id;
  }else{
    if(id.indexOf("-") == -1){
      guid = String(id) + "-" + String(new Date().getTime());
    }else{
      guid = id;
    }
  }
  if (localStorage.draftIdMap == undefined) {
    let draftIdMap = new Object();
    let idHash = new Object();
    idHash[guid] = newFormData;
    draftIdMap[draftName] = idHash;
    let draftIdMapString = JSON.stringify(draftIdMap);
    localStorage.draftIdMap = draftIdMapString;
  } else {
    let draftIdMap = JSON.parse(localStorage.draftIdMap);
    if (draftIdMap[draftName] != undefined) {
      let idHash = draftIdMap[draftName];
      idHash[guid] = newFormData;
    } else {
      let idHash = new Object();
      idHash[guid] = newFormData;
      draftIdMap[draftName] = idHash;
    }
    let draftIdMapString = JSON.stringify(draftIdMap);
    localStorage.draftIdMap = draftIdMapString;
  }
  // console.log(localStorage,"set");
}

/**
 * 删除草稿对象
 * @param draftName
 * @param id
 */
formDraftTool.removeDraftByNameAndId = function (draftName, id) {
  if (draftName == "") {
    return;
  }

  if (localStorage.draftIdMap != undefined) {
    let draftIdMap = JSON.parse(localStorage.draftIdMap);
    if (draftIdMap[draftName] != undefined) {
      let idHash = draftIdMap[draftName];
      if (idHash[id] != undefined) {
        delete idHash[id];
        let draftIdMapString = JSON.stringify(draftIdMap);
        localStorage.draftIdMap = draftIdMapString;
      }

    }
  }
}

function newGuid()
{
  let guid = "";
  for (var i = 1; i <= 32; i++){
    let n = Math.floor(Math.random()*16.0).toString(16);
    guid +=   n;
    if((i==8)||(i==12)||(i==16)||(i==20))
      guid += "-";
  }
  return guid;
}
