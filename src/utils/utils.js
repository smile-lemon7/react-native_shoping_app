import { file_host } from '../constants';

const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
export function isPhoneNum(path) {
  return reg.test(path);
}


export function getQueryString(field) {
  var reg = new RegExp("(^|&)" + field + "=([^&]*)(&|$)", "i");
  var params = window.location.hash.split('?')[1];
  var r = params.match(reg);
  if (r != null) return unescape(r[2]); return null;
}

export function saveLocalStorage({type, value}) {
  return window.localStorage.setItem(type, value)
}

export function getLocalStorage(type) {
  let value = window.localStorage.getItem(type);
  return value;
}

export function formatImageUrl(url) {
  return file_host + url;
}


export function getmyDate() {
  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth()+1).toString();
  var day = date.getDate().toString();
  var hour =  date.getHours().toString();
  var minute = date.getMinutes().toString();
  return year+'-'+month+'-'+day;
}

export function getTimeDifference(date){
  //转换时间
  let regEx = new RegExp("\\-","gi");
  let validDateStr=date.replace(regEx,"/");
  let milliseconds=Date.parse(validDateStr);
  var sendTime = new Date(milliseconds);
  //当前时间
  var nowTime = new Date();
  //差值
  var date3 = nowTime-sendTime;
  //天
  var days=Math.floor(date3/(24*3600*1000));
  return days;
}