(
    function () {
        console.log('load:BaseObject.js');
        window.generateUUID = function (suffix) {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            if (suffix)
                return uuid + suffix;
            return uuid;
        };

        var BaseObject = window.BaseObject = function (config) {
            var config = config || {};
            this.type = "BaseObject";
            this.config = config;
            this.width = config.width || 5;
            this.height = config.height || 5;
            this.coordinate = config.coordinate || { x: 0, y: 0 };
            this.context = config.context || undefined;
            this.id = generateUUID();
           
        }

        BaseObject.prototype.init = function () {
            console.log("BaseObject.prototype.init");
            var context = this.context = document.createElement("div");
            context.style.position = "absolute";
            var parent = this.parent;
            context.style.width = this.width + "px";
            context.style.height = this.height + "px";
            context.id = this.id;
            this.__proto__.refresh.call(this);
            this.parent.context.appendChild(this.context);
            
            console.log("created:" + this.type + "id:" + this.id);
        }

        BaseObject.prototype.refresh = function () {
            this.context.style.left = (this.coordinate.x + this.parent.context.clientLeft) + "px";
            this.context.style.top = (this.coordinate.y + this.parent.context.clientTop) + "px";
        }

        BaseObject.prototype.remove = function () {
            this.parent.context.removeChild(this.context);
        }

        BaseObject.prototype.collision = function (obj) {
            if (obj.coordinate.x <= this.coordinate.x + this.width
                && obj.coordinate.x >= this.coordinate.x - obj.width
                && obj.coordinate.y <= this.coordinate.y + obj.height
                && obj.coordinate.y >= this.coordinate.y - this.height)
                return true;
            return false;
        }
    }()
);