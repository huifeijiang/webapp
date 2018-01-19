/**
 * Created by Administrator on 2017/9/23 0023.
 */
//序列化表单
export default {
  formser:function(form){
  var form = document.querySelector(form);
  var arr = {};
  for (var i = 0; i < form.elements.length; i++) {
    var feled = form.elements[i];
    switch (feled.type) {
      case undefined:
      case 'button':
      case 'file':
      case 'reset':
      case 'submit':
        break;
      case 'checkbox':
      case 'radio':
        if (!feled.checked) {
          break;
        }
      default:
        if (arr[feled.name]) {
          arr[feled.name] = arr[feled.name] + ',' + feled.value;
        } else {
          arr[feled.name] = feled.value;

        }
    }
  }
  return arr
}
}

