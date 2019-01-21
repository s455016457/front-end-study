console.log('load:Battlefield.js');

(function () {
    var Battlefield = window.Battlefield = function (parent, config) {
        config = config || { width: 600, height:800 };
        BaseObject.call(this, config);

        this.type = "Battlefield";
        this.parent = parent;
        this.enermies = [];
        this.difficultyModel = {};

        this.init = function () {
            var me = this;
            this.__proto__.init.call(this);
            var context = this.context;

            var toolbar = this.toolbar = document.createElement("div");
            toolbar.style.position = "absolute";
            toolbar.style.width = this.width + "px";
            toolbar.style.height = "30px";
            toolbar.style.border = "1px solid #F00";
            this.toolbar.style.left = (this.coordinate.x + this.parent.context.clientLeft) + "px";
            this.toolbar.style.top = (this.coordinate.y + this.parent.context.clientTop) + "px";

            context.style.border ="1px solid #000000";
            context.style.paddingBottom = "5px"
            this.parent.context.appendChild(this.toolbar);


            var aircaft = this.aircaft = new Aircraft(this, GameConfig.Aircraft);
            this.difficultyModel = GetDifficultyModel.call(this);
            var body = document.getElementsByTagName("body")[0];
            body.onkeydown = function (event) { keyDown.call(me, event); };
            var timer = setInterval(function () {
                me.difficultyModel = GetDifficultyModel.call(me);
				SetAiraftBulletCount.call(me.aircaft);
                CreateEnermy.call(me);
                EnermyMove.call(me);
                EnermyFire.call(me);
                Collision.call(me);
                SetToolbar.call(me);
                me.aircaft.fire();
                me.__proto__.refresh.call(me);
                if (me.aircaft.lifeVlue <= 0) {
                    alert("很遗憾,你失败了！刷新页面重新开始！")
                    clearInterval(timer);
                } else if (me.aircaft.score >= GameConfig.WinScore) {
                    alert("恭喜你,你成功了！刷新页面重新开始！")
                    clearInterval(timer);
                }

            }, 50);
            this.__proto__.__proto__.refresh.call(this);
        }
        this.init();
    }
	
	function SetAiraftBulletCount(){
		this.bulletCount = this.score/300;
		this.bulletCount=this.bulletCount||1;
	}

    function SetToolbar() {
        this.toolbar.innerHTML = "得分：" + this.aircaft.score;
        this.toolbar.innerHTML += "|关卡：" + this.difficultyModel.name;
        this.toolbar.innerHTML += "|生命值：" + this.aircaft.lifeVlue; 
    }

    function CreateEnermy() {
        var config = { width: 35, height: 35, coordinate: { x: CreatedRandomInt(0, this.width - 35 - 1), y: 0 } };
        var difficultyModel = this.difficultyModel;
        var randomValue = CreatedRandomInt(0, difficultyModel.ProBase);
        if (randomValue % difficultyModel.CreatedEnemyPor == 0) {
            config.speed = difficultyModel.MoveSpeed
            config.scoreValue = difficultyModel.ScoresValue;
            if (difficultyModel.LiftValue1Pro && randomValue % difficultyModel.LiftValue1Pro == 0) {
                config.lifeVlue = 1;
            }
            if (difficultyModel.liftValue2Pro && randomValue % difficultyModel.liftValue2Pro == 0) {
                config.lifeVlue = 2;
            }
            if (difficultyModel.liftValue3Pro && randomValue % difficultyModel.liftValue3Pro == 0) {
                config.lifeVlue = 3;
            }
            this.enermies.push(new Enemy(this, config));
        }
    }

    function EnermyMove() {
        var enermies = this.enermies;
        var difficultyModel = this.difficultyModel;
        for (var i = 0; i < enermies.length; i++) {
            var randomValue = CreatedRandomInt(0, difficultyModel.ProBase);
            if (randomValue % difficultyModel.LeftMovePro == 0) {
                enermies[i].move("left");
            }
            if (randomValue % difficultyModel.RightMovePro == 0) {
                enermies[i].move("right");
            }
            if (randomValue % difficultyModel.UpMovePro == 0) {
                enermies[i].move("up");
            }
            if (randomValue % difficultyModel.DownMovePro == 0) {
                enermies[i].move("down");
            }
        }
    }

    function GetDifficultyModel() {
        var DifficultyModel = GameConfig.DifficultyModel;
        var model = {};
        for (var i = 0; i < DifficultyModel.length; i++) {
            if (this.aircaft.score >= DifficultyModel[i].MeetScores) {
                model = DifficultyModel[i];
            } else {
                return model;
            }
        }
        return model;
    }

    function CreatedRandomInt(MinValue, MaxValue) {
        function createdRandomInt() {
            if (MaxValue >= 0) {
                if (MinValue < 0) {
                    var minVLength = String(Math.abs(MinValue)).length;
                    var maxVLength = String(MaxValue).length;
                    var length = maxVLength > minVLength ? maxVLength : minVLength;

                    var boolean = parseInt(Math.random() * 1000) % 2;
                    var val = parseInt(Math.random() * Math.pow(10, length));

                    return boolean ? val : val * -1;
                } else {
                    return parseInt(Math.random() * MaxValue);
                }
            } else {
                return parseInt(Math.random() * MinValue);
            }
        }
        var value = createdRandomInt();
        while (value < MinValue || value > MaxValue) {
            value = createdRandomInt();
        }

        return value;
    }
    
    function EnermyFire() {
        var enermies = this.enermies;
        var difficultyModel = this.difficultyModel;
        for (var i = 0; i < enermies.length; i++) {
            var randomValue = CreatedRandomInt(0, difficultyModel.ProBase);
            if (randomValue % difficultyModel.FirePro == 0) {
                enermies[i].fire();
            }
        }
    }

    function keyDown(event) {
        switch (event.keyCode) {
            case 38:
                this.aircaft.move("up");
                break;
            case 40:
                this.aircaft.move("down");
                break;
            case 37:
                this.aircaft.move("left");
                break;
            case 39:
                this.aircaft.move("right");
                break;
            case 32:
                this.aircaft.fire();
                break;
        }
    }

    function Collision() {
        var bullets = this.aircaft.bullets;
        var enermies = this.enermies;
        for (var i = 0; i < bullets.length; i++) {
            var bullet = bullets[i];
            for (var j = 0; j < enermies.length; j++) {
                var enermy = enermies[j];
                if (bullet.collision(enermy)) {
                    enermy.lifeVlue--;
                    if (enermy.lifeVlue <= 0) {
                        this.aircaft.score += enermy.scoreValue;
                        enermy.remove.call(enermy);
                        this.enermies[j] = null;
                        this.enermies.splice(j--, 1);
                    }
                    bullets[i].remove.call(bullets[i]);
                    bullets[i] = null;
                    bullets.splice(i--, 1);
                }
            }
        }

        for (var j = 0; j < enermies.length; j++) {
            var enermy = enermies[j];

            if (enermy.collision(this.aircaft)) {
                this.aircaft.lifeVlue -= 1;
                enermy.remove.call(enermy);
                this.enermies[j] = null;
                this.enermies.splice(j--, 1);
            }

            var bullets = enermy.bullets;
            if (!bullets) continue;
            for (var i = 0; i < bullets.length; i++) {
                var bullet = bullets[i];
                if (bullet.collision(this.aircaft)) {
                    this.aircaft.lifeVlue -= 1;
                    bullet.remove.call(bullet);
                    this.enermies[j].bullets[i] = null;
                    this.enermies[j].bullets.splice(i--, 1);
                }
            }

            if (enermy.coordinate.y + enermy.height >= this.height) {
                this.aircaft.lifeVlue -= 1;
                enermy.remove.call(enermy);
                this.enermies[j] = null;
                this.enermies.splice(j--, 1);
            }
        }
    }
    // 创建一个没有实例方法的类
    var Super = function () { };
    Super.prototype = BaseObject.prototype;
    //将实例作为子类的原型
    Battlefield.prototype = new Super();

    Battlefield.prototype.init = function () {
        console.log("Battlefield.prototype.init");
        this.__proto__.__proto__.init.call(this);
    }

    Battlefield.prototype.refresh = function () {
        if (this.aircaft)
            this.aircaft.refresh.call(this.aircaft)
        var enermies = this.enermies;
        if (enermies) {
            for (var i = 0; i < enermies.length; i++) {
                for (var j = 0; j < enermies.length; j++) {
                    if (i == j) continue;
                    if (enermies[i].collision(enermies[j])) {
                        if (enermies[i].coordinate.x >= enermies[j].coordinate.x) {
                            enermies[i].coordinate.x = enermies[j].coordinate.x + enermies[j].width;
                            if (enermies[i].coordinate.x > this.width) {
                                enermies[i].coordinate.x = this.width;
                                enermies[i].coordinate.y = enermies[j].coordinate.y + enermies[j].height;
                            }
                        } else {
                            enermies[j].coordinate.x = enermies[i].coordinate.x + enermies[i].width;
                            if (enermies[j].coordinate.x > this.width) {
                                enermies[j].coordinate.x = this.width;
                                enermies[j].coordinate.y = enermies[i].coordinate.y + enermies[i].height;
                            }
                        }
                    }
                }
                enermies[i].refresh();
            }
        }
    }

}());

