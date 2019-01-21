console.log('load:Aircraft.js');

(function () {
    var Aircraft = window.Aircraft = function (parent, config) {
        var config = config || { width: 35, height: 35 };
        this.parent = parent;
        this.config = config;
        this.speed = config.speed || 4;
		this.bulletCount = config.bulletCount || 1;
        this.bulletCoolDownTime = config.bulletCoolDownTime || 500;
        this.bulletCoolDown = true;
        this.bullets = [];
        this.bulletSpeed = config.bulletSpeed || -5.8;
        this.bulletWidth = config.bulletWidth || 3;
        this.bulletHeight = config.bulletHeight || 6;
        this.score = config.score || 0;
        this.lifeVlue = config.lifeVlue || 4;
        BaseObject.call(this, config);

        this.type = "Aircraft";

        function init() {

            this.width = this.config.width || 10;
            this.height = this.config.height || 10;

            this.coordinate = this.config.coordinate || {
                x: ((parent.x || 0) + (parent.width || 0) - this.width) / 2
                , y: (parent.y || 0) + (parent.height || 0) - this.height
            };

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
    Aircraft.prototype = new Super();

    Aircraft.prototype.init = function () {
        console.log("Aircraft.prototype.init");
        this.__proto__.__proto__.init.call(this);
    }

    Aircraft.prototype.move = function (direction) {
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
                if (this.coordinate.x > this.parent.width - this.width - 1) this.coordinate.x = this.parent.width - this.width - 1;
                break;
        }
    }

    Aircraft.prototype.refresh = function () {
        this.__proto__.__proto__.refresh.call(this);
        var bullets = this.bullets;
        if (bullets) {
            for (i = 0; i < bullets.length; i++) {
                bullets[i].move.call(bullets[i]);
                if (bullets[i].coordinate.y <= 0) {
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

    Aircraft.prototype.fire = function () {
        console.log("Aircraft.prototype.fire");
        var me = this;
		var newBullets=[];
        if (this.bulletCoolDown) {
            this.bulletCoolDown = false;

            setTimeout(function () {
                me.bulletCoolDown = true;
            }, this.bulletCoolDownTime);
			var count=me.bulletCount;
			var b=count%2;
			var jianju=10;
			while(count>0){
				var bullet=undefined;
				if(!b){
					if(count==me.bulletCount||count==me.bulletCount-1){
						bullet = new Bullet(this.parent, {
							width: this.bulletWidth
							, height: this.bulletHeight
							, speed: this.bulletSpeed
							, coordinate: { x: this.coordinate.x + (this.width+jianju) / 2, y: this.coordinate.y - this.bulletHeight }
						});
					}else{
						bullet = new Bullet(this.parent, {
							width: this.bulletWidth
							, height: this.bulletHeight
							, speed: this.bulletSpeed
							, coordinate: { x: this.coordinate.x + (this.width / 2)+jianju, y: this.coordinate.y - this.bulletHeight }
						});
					}
					jianju*=-1;
				}
				else{
					if(count==me.bulletCount){
						bullet = new Bullet(this.parent, {
							width: this.bulletWidth
							, height: this.bulletHeight
							, speed: this.bulletSpeed
							, coordinate: { x: this.coordinate.x + this.width / 2, y: this.coordinate.y - this.bulletHeight }
						});
					}else{
						bullet = new Bullet(this.parent, {
							width: this.bulletWidth
							, height: this.bulletHeight
							, speed: this.bulletSpeed
							, coordinate: { x: this.coordinate.x + (this.width / 2)+jianju, y: this.coordinate.y - this.bulletHeight }
						});
						jianju*=-1;
					}
				}
				if(bullet)
					newBullets.push(bullet)
				
				count--;
			}
            if (newBullets) {
                this.bullets=this.bullets.concat(newBullets);
				return newBullets;
            }
        }
    }
}());

