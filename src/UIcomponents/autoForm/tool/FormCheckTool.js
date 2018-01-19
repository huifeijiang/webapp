/**
 * Created by Administrator on 2017/10/20 0020.
 */
import {formErrorType} from "./FormErrorType"

export const formCheckTool = {}

formCheckTool.check = function (form) {

  let result = {
    submitMess: '',
    flag: true,
  };
  for (let item of form) {
    if (item.isShow) {
      if (item.isRequire){
        for (let errorType of Object.keys(item.submitMess)) {
          if (errorType == formErrorType.NULLERROR) {
            result = formCheckTool.checkNullError(errorType, item);
          } else if (errorType == formErrorType.NUMBERERROR) {
            result = formCheckTool.checkNumberError(errorType, item);
          }
          if (!result.flag) {
            return result;
          }
        }
      }else {
        for (let errorType of Object.keys(item.submitMess)) {
          if (errorType == formErrorType.NUMBERERROR) {
            result = formCheckTool.checkNumberError(errorType, item);
          }
          if (!result.flag) {
            return result;
          }
        }
      }
    }
  }
  return result;
}

/**
 * 验证是否为空
 * @param errorType
 * @param item
 * @returns {{submitMess: string, flag: boolean}}
 */
formCheckTool.checkNullError = function (errorType, item) {
  let result = {
    submitMess: '',
    flag: true,
  };
  if (item.modalValue === "" || item.modalValue == null) {
    if (item.submitMess[errorType] == "") {
      result.submitMess = '请输入' + item.label;
    } else {
      result.submitMess = item.submitMess[errorType];
    }
    result.flag = false;
  } else if (item.modalValue.length == 0) {
    if (item.submitMess[errorType] == "") {
      result.submitMess = '请上传' + item.label;
    } else {
      result.submitMess = item.submitMess[errorType];
    }
    result.flag = false;
  }
  return result;
}

/**
 * 验证数字
 * @param errorType
 * @param item
 * @returns {{submitMess: string, flag: boolean}}
 */
formCheckTool.checkNumberError = function (errorType, item) {
  let result = {
    submitMess: '',
    flag: true,
  };
  if (isNaN(item.modalValue)) {
    if (item.submitMess[errorType] == "") {
      result.submitMess = item.label + "请输入数字";

    } else {
      result.submitMess = item.submitMess[errorType];
    }
    result.flag = false;
  }
  return result;
}

