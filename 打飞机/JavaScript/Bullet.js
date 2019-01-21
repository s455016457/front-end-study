console.log('load:Bullet.js');

(function () {
    var Bullet = window.Bullet = function (parent, config) {
        var config = config || { width: 3,height:5 };
        this.parent = parent;
        this.config = config;
        this.speed = config.speed || 8;
        BaseObject.call(this, config);

        this.type = "Bullet";

        function init() {

            this.width = this.config.width || 3;
            this.height = this.config.height || 5;

            this.__proto__.init.call(this);
            
            var context = this.context;
            var img = document.createElement('img');
            img.style.width = this.width + "px";
            img.style.height = this.height + "px";
            img.src = "images/aircraft.jpg";
            context.appendChild(img);
        }

        init.call(this);
    }

    // 创建一个没有实例方法的类
    var Super = function () { };
    Super.prototype = BaseObject.prototype;
    //将实例作为子类的原型
    Bullet.prototype = new Super();

    Bullet.prototype.init = function () {
        console.log("Bullet.prototype.init");
        this.__proto__.__proto__.init.call(this);
    }

    Bullet.prototype.move = function () {
        this.coordinate.y += this.speed;
        this.refresh.call(this);
    }
}());

