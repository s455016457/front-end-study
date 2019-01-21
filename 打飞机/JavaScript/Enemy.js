console.log('load:Enemy.js');

(function () {
    var Enemy = window.Enemy = function (parent, config) {
        var config = config || {};
        this.parent = parent;
        this.config = config;
        this.speed = config.speed || 3;
        this.bulletCoolDownTime = config.bulletCoolDownTime || 500;
        this.bulletCoolDown = true;
        this.bullets = [];
        this.lifeVlue = config.lifeVlue || 1;
        this.scoreValue = config.scoreValue || 1;
        BaseObject.call(this, config);

        this.type = "Enemy";

        function init() {

            this.width = this.config.width || 30;
            this.height = this.config.height || 30;

            this.coordinate = this.config.coordinate || {
                x: ((parent.x || 0) + (parent.width || 0) - this.width) / 2
                , y: 0
            };
            this.coordinate.y = 0;

            this.__proto__.init.call(this);

            var context = this.context;
            var img = document.createElement('img');
            img.style.width = this.width + "px";
            img.style.height = this.height + "px";
            img.src = "images/UFO.png";
            context.appendChild(img);
        }

        init.call(this);
    }

    // 创建一个没有实例方法的类
    var Super = function () { };
    Super.prototype = BaseObject.prototype;
    //将实例作为子类的原型
    Enemy.prototype = new Super();

    Enemy.prototype.init = function () {
        console.log("Enemy.prototype.init");
        this.__proto__.__proto__.init.call(this);
    }

    Enemy.prototype.move = function (direction) {
        switch (direction) {
            case "up":
                this.coordinate.y -= this.speed;
                if (this.coordinate.y < 0) this.coordinate.y = 0;
                break;
            case "down":
                this.coordinate.y += this.speed;
                if (this.coordinate.y > this.parent.height - this.height) this.coordinate.y = this.parent.height - this.height;
                break;
            case "left":
                this.coordinate.x -= this.speed;
                if (this.coordinate.x < 0) this.coordinate.x = 0;
                break;
            case "right":
                this.coordinate.x += this.speed;
                if (this.coordinate.x > this.parent.width - this.width) this.coordinate.x = this.parent.width - this.width;
                break;
        }
    }

    Enemy.prototype.refresh = function () {
        this.__proto__.__proto__.refresh.call(this);
        var bullets = this.bullets;
        if (bullets) {
            for (i = 0; i < bullets.length; i++) {
                bullets[i].move.call(bullets[i]);
                if (bullets[i].coordinate.y >= this.parent.height) {
                    bullets[i].remove.call(bullets[i]);
                    bullets[i] = null;
                    bullets.splice(i--, 1);
                }
                else {
                    bullets[i].refresh.call(bullets[i]);
                }
            }
        }
    }

    Enemy.prototype.remove = function () {
        var bullets = this.bullets;
        if (bullets) {
            for (i = 0; i < bullets.length; i++) {
                bullets[i].remove.call(bullets[i]);
            }
            this.bullets = bullets = null;
        }
        this.__proto__.__proto__.remove.call(this);
    }

    Enemy.prototype.fire = function () {
        console.log("Enemy.prototype.fire");
        var me = this;
        if (this.bulletCoolDown) {
            this.bulletCoolDown = false;

            setTimeout(function () {
                me.bulletCoolDown = true;
            }, this.bulletCoolDownTime);

            var bullet = new Bullet(this.parent, { width: 2, height: 5, speed: 5, coordinate: { x: this.coordinate.x + this.width / 2, y: this.coordinate.y - 12 } });
            if (bullet) {
                this.bullets.push(bullet);
                return bullet;
            }
        }
    }
}());

