/**
 * Created by haibalai on 2017/10/25.
 */
import {formType} from './FormType';
import {
  dateTool
} from '../../../gisComponets/tool/DateTool.js';
import {eventBus} from '../../../components/eventBus/eventBus'
export const formFillTool = {}

/**
 *表单初始化
 * @param formData
 */
formFillTool.initForm = function (formData, fillData) {
  formFillTool.setFormParent(formData);
}

/**
 * 填充表单初始值
 * @param formData  表单json对象数组
 * @param fillData  后台填充的值 null 和 空字符串不填充
 * @param fillData  后台填充的值 null 和 空字符串不填充
 */

formFillTool.fillForm = function (formData, fillData) {
  for (let formName of Object.keys(fillData)) {
    if (fillData[formName] === "" || fillData[formName] == null) {
      continue;
    }
    let formItem = formFillTool.getItemByFormName(formName, formData);
    //如果找到字段说明是他的本体 直接匹配modalValue 字段
    if (formItem != null) {
      formItem.modalValue = fillData[formName];
      //formRadioText 控件比较复杂 特殊处理
      if (formItem.formType == formType.formRadioText) {
        let falseValue = "";
        let trueValue = "";
        for (let dic of formItem.dictionary) {
          if (dic.isText == false) {
            falseValue = dic.value;
          } else {
            trueValue = dic.value;
          }
        }
        if (fillData[formName] != falseValue) {
          formItem.value = trueValue;
        } else {
          formItem.value = falseValue;
        }
      }
      //特殊处理时间组件formRadio
      if (formItem.formType == formType.formRadio) {
        formItem.modalValue = String(fillData[formName]);
        for (let dic of formItem.dictionary) {
          if (String(dic.value) == String(fillData[formName])) {
            formItem.modalCValue = dic.label;
          }
        }
      }
      //处理formSelectText 单选(以后后台会解决)
      if (formItem.formType == formType.formSelectText) {
        let radioText = "";
        if (!formItem.selfDefine.selectMore) {
          for (let dic of formItem.dictionary) {
            if (!dic.isText) {
              if (String(dic.value) === String(fillData[formName])) {
                formItem.modalCValue = dic.label;
              }
            }
          }
        }
      }
      //特殊处理时间组件formDate
      if (formItem.formType == formType.formDate) {
        if (!isNaN(Number(fillData[formName]))) {
          formItem.modalCValue = dateTool.toDate(new Date(Number(fillData[formName])), 'yyyy年MM月dd日')
        }
      }
      //处理社区展示
      if (formItem.formType == formType.formSocialSelct) {
        formItem.label = '社区网格'
        formItem.modalCValue = fillData["gridName"];
      }
      //处理预览和详情共用增加的字段
      if (formItem.submitShow != undefined) {
        if (formItem.submitShow) {
          formItem.isShow = true;
        }
      }
      //带单位的formText控件的展示
      if (formItem.formType == formType.formText) {
        if (formItem.label.indexOf('(') != -1) {
          let unit = formItem.label.split('(')[1].split(')')[0];
          if (isNaN(formItem.modalValue)) {
            formItem.modalCValue = formItem.modalValue;
          } else {
            formItem.modalCValue = formItem.modalValue + unit;
          }
        } else {
          formItem.modalCValue = formItem.modalValue;
        }
      }
    }
    //如果找到Name说明字段是modalCValue
    else if (formName.indexOf("Name") != -1) {
      let newFormName = formName.substr(0, formName.length - 4);
      let newformItem = formFillTool.getItemByFormName(newFormName, formData);
      if (newformItem != null) {
        newformItem.modalCValue = fillData[formName];
        if (newformItem.formType == formType.formSelectText) {
          if (newformItem.selfDefine.selectMore) {
            for (let dic1 of newformItem.dictionary) {
              if (dic1.isText) {
                if(dic1.text){
                  newformItem.modalCValue = newformItem.modalCValue + dic1.text;
                }else {
                  newformItem.modalCValue = newformItem.modalCValue
                }
              }
            }
          }
        }
      }

    }
    //如果找到other说明字段是formSelectText 控件的 isText为true
    else if (formName.indexOf("other") != -1) {
      let item = formName.substring(5)
      let newitem = item.substr(0, 1).toLowerCase() + item.substring(1)
      let newFormName1 = newitem.substr(0, newitem.length - 1);
      let newformItem1 = formFillTool.getItemByFormName(newFormName1, formData)
      if (newformItem1 != null) {
        let resultStr = []
        for (let dic of newformItem1.dictionary) {
          if (dic.isText) {
            resultStr.push(dic);
            resultStr.forEach((val, index) => {
              if (val.field == formName) {
                val.text = fillData[formName];
                if(newformItem1.modalCValue != ""){
                  newformItem1.modalCValue +=  val.text;
                }else{
                  newformItem1.modalCValue = newformItem1.modalCValue
                }
              }
            });
          }
        }
      }

    }
  }
}


formFillTool.getItemByFormName = function (formName, formData) {
  for (let item of formData) {
    if (item.formName === formName) {
      return item;
    }
  }
  return null;
}

/**
 *设置表单节点的父子关系
 * @param formData
 */
formFillTool.setFormParent = function (formData) {
  let hash = new Map();
  for (let item of formData) {
    if (!hash.has(item.label)) {
      hash.set(item.label, item);
    }
    if (item.ishowParent != undefined && item.ishowParent != "") {
      let parentItem = hash.get(item.ishowParent);
      item.parent = parentItem;
    }
  }
}
/**
 * 表单提交序列化后台对象
 * @param formData
 * @returns {{}}
 */
formFillTool.formSubmit = function (formData) {
  let submitObj = {};
  for (let item of formData) {
    if (item.isShow) {
      submitObj[item.formName] = item.modalValue;
    }
    if (item.formType == formType.formSelectText) {
      for (let dic of item.dictionary) {
        if (dic.isText == true) {
          let result = []
          String(item.modalValue).split(",").forEach((val, index) => {
            result.push(val.split('-')[0])
          })
          submitObj[item.formName] = result.join(',');
          submitObj[dic.field] = dic.text;
          // let newFormNameStart = item.formName.substr(0,1).toUpperCase();
          // item.formName = newFormNameStart +  item.formName.substr(1,item.formName.length);
          // submitObj['other' + item.formName] = dic.text;
        }
      }
    }
  }
  return submitObj;
}

/**
 * 设置经纬度
 * @param submitObj
 * @param longitude
 * @param latitude
 */
formFillTool.formSetLongitude = function (submitObj, longitude, latitude) {

  submitObj['longitude'] = longitude;
  submitObj['latitude'] = latitude;
}

/**
 * 克隆一个表单对象 不包含复杂Function 所以可以用json stringfy
 * @param formData
 * @returns {Array}
 */
formFillTool.formClone = function (formData) {

  let arr = new Array();
  for (let item of formData) {
    arr.push(JSON.parse(JSON.stringify(item)));
  }
  return arr;

}
/**
 * 获取图片类型formItem
 * @param formData
 * @returns {*}
 */
formFillTool.getPhotoItem = function (formData) {
  let imageList = [];
  let imagesPic = [];
  for (let item of formData) {
    if (item.formType == formType.formPhotoGraph) {
      if (item.modalValue.length > 0) {
        imageList.push(item);
      } else {
        item.modalValue = []
      }
    }
  }
  imageList.forEach(val => {
    if (val.modalValue instanceof Array) {
      imagesPic.push(val);
    }
  })
  return imagesPic;
}
/**
 * 获取formText带单位formItem
 * @param formData
 * @returns {*}
 */
formFillTool.isShowUnit = function (formData) {
  for (let formItem of formData) {
    //带单位的formText控件的展示
    if (formItem.formType == formType.formText) {
      if (formItem.label.indexOf('(') != -1 && formItem.modalValue) {
        let unit = formItem.label.split('(')[1].split(')')[0];
        formItem.modalCValue = formItem.modalValue + unit;
      } else {
        formItem.modalCValue = formItem.modalValue
      }
    }
  }
}



