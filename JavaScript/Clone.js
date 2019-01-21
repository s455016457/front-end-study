/**
 * 浅克隆
 * */
/**
 * 浅克隆 克隆传入对象，只克隆一层
 * @param {any} source
 */
function shallowClone(source) {
    var tiaget = createEctype(source);  //创建一个副本
    // 将原对象的所有属性值赋值到新对象上
    for (var property in source) {
        if (source.hasOwnProperty(property)) {
            tiaget[property] = source[property];
        }
    }
    /**
    * 创建副本
    * @param {any} source
    */
    function createEctype(source) {
        var newObject = {};
        if (Array.isArray(source))
            newObject = [];
        return newObject;
    }

    return tiaget;
}

/**
 * 深克隆
 * 
 * 示例：
 * var a={a1:1,a2:2,a3:[1,2,3]};
 * var b={b1:1,b2:2,b3:[4,5,6]}
 * a.b=b;
 * b.a=a;
 * a.a4=[a,b];
 * b.b4=[a,b];
 * a.fn=function(){console.log(this.b);return this.b;};
 * 
 * var newa=deepClone(a);
 * newa.a1=123;
 * newa.fn();
 */
function deepClone(source) {
    this.objKeyCache = [];      // 对象缓存
    this.objValueCache = [];    // 对象克隆缓存

    this.clone = function (source) {
        var target = createEctype.call(this, source);
        for (var property in source) {
            if (source.hasOwnProperty(property)) {
                var value = source[property];
                if (typeof value === "number"
                    || typeof value === "boolean"
                    || typeof value === "symbol"
                    || typeof value === "string"
                    || typeof value === "function"
                    || typeof value === "undefined"
                    || value === null)
                    target[property] = value;
                else if (typeof value === "object") {
                    // 如果源对象在对象缓存中存在，就用对象克隆缓存中的值赋值
                    var index = this.objKeyCache.indexOf(value);
                    if (index >= 0)
                        target[property] = this.objValueCache[index];   
                    else {
                        target[property] = this.clone( value);
                    }
                }
                else
                    throw "未知数据类型" + (typeof value);
            }
        }

        return target;
    };
    /**
     * 创建副本
     * @param {any} source
     */
    function createEctype(source) {
        var target = {};
        if (Array.isArray(source))
            target = [];
        this.objKeyCache.push(source);
        this.objValueCache.push(target);
        return target;
    }
    var newObject = this.clone(source);
    // 释放缓存，防止内存溢出
    this.objKeyCache = [];
    this.objValueCache = [];
    return newObject;
}