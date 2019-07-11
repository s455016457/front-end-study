//获取当前 URL 截取参数对象
// ?foo=bar&baz=bing => {foo: bar, baz: bing}
let q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
console.log(q); // {foo: bar, baz: bing}



//生成随机 16 进制颜色
'#' + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0');

//数组去重
function unique(arr){
  return [...(new Set(arr))];
}
unique([1,1,2,3,4,2,3,4,5,3,3,4]); // [1, 2, 3, 4, 5]

//获取 24 小时制的时间
var myDate = new Date()
console.log(myDate.toLocaleTimeString('chinese', {hour12: false}));
// 14:57:15


//时间戳转与日期格式相互转换
//时间戳转换成日期格式
function timestampToTime (timestamp) {
  // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let dateTime = timestamp.toString().length > 10 ? timestamp : timestamp * 1000;
  let date = new Date(dateTime);
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = (date.getDate()+1 < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours()+1 < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes()+1 < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  let s = (date.getSeconds()+1 < 10 ? '0'+date.getSeconds() : date.getSeconds());
  return Y+M+D+h+m+s;
}

let onTime = new Date().valueOf();
timestampToTime(onTime) // "2019-04-29 14:54:35"
//日期格式转换成时间戳
let date = new Date('2014-04-23 18:55:49:123');
// 有三种方式获取
let time1 = date.getTime();
let time2 = date.valueOf();
let time3 = Date.parse(date);
console.log(time1); // 1398250549123
console.log(time2); // 1398250549123
console.log(time3); // 1398250549000