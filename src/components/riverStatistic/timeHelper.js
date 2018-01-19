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
  // var t2 = year2 + '-' + month2 +'-'+ day2;
  var t2 = year2 + '-' + month2;
  return t2;
}
/*
 获取今天是当年的第几周
 */
export function getYearWeek() {
  //date1是当前日期
  //date2是当年第一天
  //d是当前日期是今年第多少天
  //用d + 当前年的第一天的周差距的和在除以7就是本年第几周
  var a = new Date().getFullYear()
  var b = new Date().getMonth() + 1
  var c = new Date().getDate()
  var date1 = new Date(a, parseInt(b) - 1, c), date2 = new Date(a, 0, 1),
    d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
  return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
};
/*
 获取数组元素索引
 array是要循环的数组
 item 是匹配的元素
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
 设置时间选择器月周内容
 array1是slot对象
 unit 是元素的单位
 length 是要元素的长度
 */
export function selectorContent(array1, unit, length) {
  array1[0].values = ['2017年', '2018年', '2019年', '2020年']
  for (let i = 1; i <= length; i++) {
    let flag = i;
    let param = false;
    param = length > 12 ? true : false;
    if (!param) {
      i < 10 ? (flag = '0' + i + unit) : (flag = i + unit);
    } else {
      flag = i + unit;
    }
    array1[1].values.push(flag)
  }
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
 每日的数据
 array1是slot对象
 unitMonth 是月份的单位
 length 是要月份的长度
 unitDay是要日的单位
 * */
export function selectorDailyContent(array1, unitMonth, Monthlength, unitDay) {
  let daysToThisMonth = 0;
  for (let i = 1; i <= Monthlength; i++) {
    daysToThisMonth = getDaysInOneMonth(new Date().getFullYear(), i)
    let flag = i;
    i < 10 ? (flag = '0' + i + unitMonth) : (flag = i + unitMonth);
    array1[1].values.push(flag);
    for (let j = 1; j <= daysToThisMonth; j++) {
      let par = j;
      j < 10 ? (par = '0' + j + unitDay) : (par = j + unitDay);
      array1[2].values.push(par);
    }
  }
}
/*
 formDate每日的数据
 array1是slot对象
 finalYear 是多少年
 yearUnit是单位年
 * */
export function getFormDateYear(array1, finalYear, yearUnit) {
  for (let i = 1970; i <= finalYear; i++) {
    let flag = i;
    flag = i + yearUnit
    array1.values.push(String(flag));
  }
}
