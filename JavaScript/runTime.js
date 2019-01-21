/**
获取传入方法在规定时间内执行次数

示例：
var test = function(){

};
runTime(test,1)
表示test方法 在1秒中执行了6819005次
**/

/**
 * 获取传入方法在规定时间内执行次数
 * @param {any} fn 执行的方法
 * @param {any} time 规定的时间，单位为秒
 */
function runTime(fn, time) {
    var startTime = Date.now();
    var count = 0;
    while (Date.now() - startTime < time * 1000) {
        fn.call();
        count++;
    }
    return count;
}