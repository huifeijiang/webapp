/**
 * Created by Administrator on 2018/1/8 0008.
 * @function 获取上一个月份
 * @param date参数格式是2017-01-01
 * @out  返回的数据格式是2017-01
 */
export function getPreMonth(date) {
  var arr = date.split('-');
  var year = arr[0]; //获取当前日期的年份
  var month = arr[1]; //获取当前日期的月份
  var day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {//如果是1月份，则取上一年的12月份
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {//如果原来日期大于上一月的日期，则取当月的最大日期。比如3月的30日，在2月中没有30
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;//月份填补成2位。
  }
  var t2 = year2 + '-' + month2 + '-' + day2;
  // var t2 = year2 + '-' + month2;
  return t2;
}
/*
 获取某个月的天数
 */
function getDaysInOneMonth(year, month) {
  month = parseInt(month, 10);
  var d = new Date(year, month, 0);
  return d.getDate();
}
/*
 获取索引
 */
export function getIndex(array, item) {
  for (let i = 0; i <= array.length; i++) {
    let flag = true;
    if (flag && (array[i] == item)) {
      flag = false;
      return i;
    } else {
      flag = true;
    }
  }
}
/*
 获取今天是当年的第几周
 */
export function getYearWeek(date) {
  //date1是当前日期
  //date2是当年第一天
  //d是当前日期是今年第多少天
  //用d + 当前年的第一天的周差距的和在除以7就是本年第几周
  var a = date.split('-')[0]
  var b = Number(date.split('-')[1])
  var c = Number(date.split('-')[2])
  var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
    d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
  return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7) - 1;
};
/*
 *获取当前第几季度
 * */
export function getQuater(date) {
  let baseMonth = Number(date.split('-')[1])
  if (baseMonth < 4) {
    return '1'
  } else if (4 <= baseMonth) {
    return '2'
  } else if (7 <= baseMonth) {
    return '3'
  } else if (10 <= baseMonth) {
    return '4'
  }
}
/*
 *设置年
 * */
function setYear(startYear, endYear, unit) {
  let resultYear = [];
  for (let i = startYear; i <= endYear; i++) {
    let flag = i;
    flag = i + unit;
    resultYear.push(flag)
  }
  return resultYear;
}
/*
 每日的内容
 * */
export function selectorDailyContent(a1, left, unit) {
  a1[0].values = setYear(left.minLeft, left.maxLeft, unit.unitLeft)
  let daysToThisMonth = 0;
  for (let i = 1; i <= 12; i++) {
    daysToThisMonth = getDaysInOneMonth(new Date().getFullYear(), i)
    let flag = i;
    i < 10 ? (flag = '0' + i + unit.unitCenter) : (flag = i + unit.unitCenter);
    a1[1].values.push(flag);
    for (let j = 1; j <= daysToThisMonth; j++) {
      let par = j;
      j < 10 ? (par = '0' + j + unit.unitRight) : (par = j + unit.unitRight);
      a1[2].values.push(par);
    }
  }
}
/*
 每周,每季,每月内容
 */
export function selectorContent(a1, left, unit) {
  a1[0].values = setYear(left.minLeft, left.maxLeft, unit.unitLeft)
  for (let i = 1; i <= unit.length; i++) {
    let flag = i;
    let param = false;
    param = unit.length > 12 ? true : false;
    if (param) {
      flag = i + unit.unitRight;
    } else {
      if (unit.length < 5) {
        flag = i + unit.unitRight
      } else {
        i < 10 ? (flag = '0' + i + unit.unitRight) : (flag = i + unit.unitRight);
      }
    }
    a1[1].values.push(flag)
  }
}


