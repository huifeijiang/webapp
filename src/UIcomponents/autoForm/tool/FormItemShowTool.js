/**
 * Created by haibalai on 2017/10/25.
 */
export const formItemShowTool = {}

/**
 * 判断form 组件是否可见
 * @param nowItem
 * @returns {boolean}
 */
formItemShowTool.isShowFormItem = function (nowItem) {
  let arr = new Array();
  getParentShowFlag(nowItem, arr);
  if (nowItem.submitShow == undefined || nowItem.submitShow == false) {
    if (arr.length == 0) {
      return true;
    } else {
      let flag = true;
      for (let item of  arr) {
        if (item == false) {
          flag = false;
          break;
        }
      }
      if (flag) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
  return true;
}

formItemShowTool.setShowByParent = function (formData) {
  for (let item of formData) {
    let bool = formItemShowTool.isShowFormItem(item);
    if (bool) {
      item.isShow = true;
    }
  }
}

function getParentShowFlag(nowItem, arr) {
  if (nowItem.parent != undefined) {
    let flag = isRelationCheck(nowItem, nowItem.parent);
    arr.push(flag);
    getParentShowFlag(nowItem.parent, arr);
  }
}

function isRelationCheck(childItem, parentItem) {
  let parentKeyArr = childItem.ishowParentKey.split('$');
  //只有formSelectText和formSocial和formEventList才有selectMore属性值
  if (parentItem.selfDefine&&parentItem.selfDefine.selectMore) {
    if (parentItem.modalCValue.includes(parentKeyArr.join('$'))) {
      return true;
    } else {
      return false;
    }
  } else {
    if (parentKeyArr.includes(parentItem.modalCValue)) {
      return true;
    } else {
      return false;
    }
  }
}
