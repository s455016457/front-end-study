 (
        function () {
            var Canvas = window.Canvas = function (canvas, config) {
                this.config = config || {};
                this.context = canvas.getContext("2d");
                this.points = [];
                this.clientWidth = canvas.clientWidth;
                this.clientHeight = canvas.clientHeight;
                this.width = canvas.width = this.clientWidth;
                this.height = canvas.height = this.clientHeight;
                var me = this, body = document.getElementsByTagName("body")[0];
                window.onresize = function () {
                    //canvasSize.call(me);
                }
                body.onmousemove = function (e) {
                    var event = e || window.event;
                    me.mouse = {
                        x: event.clientX,
                        y: event.clientY
                    }
                }
                body.onmouseout = function () {
                    me.mouse = undefined;
                }
                document.onmouseleave = function () {
                    me.mouse = undefined;
                }

                function init() {
                    var me = this;
                    this.config.width = this.config.width || 2;//点宽度
                    this.config.height = this.config.height || 2;//点高度
                    this.config.speed = this.config.speed || 4;//点移动速度
                    this.config.dist = this.config.dist || 100;//点吸附距离
                    this.config.collDist = this.config.collDist || 20;//碰撞距离
                    this.config.stroke = this.config.stroke || "255,165,5";//线条颜色
                    this.config.color = this.config.color || "255,165,0";//点颜色
                    this.config.e_dist = this.config.e_dist || 150;//鼠标吸附加速距离
                    this.config.max_conn = this.config.max_conn || 10;//点到点最大连接数

                    if (this.config.speed < 1)
                        throw "移动速度不能小于1";

                    var count = this.config.count = this.config.count || 100;
                    for (i = 0; i < count; i++) {
                        var XY = CreateRandomXY.call(this);
                        this.points.push({ x: XY.x, y: XY.y, width: this.config.width || 2, height: this.config.height, moveRoute: CreateRandomRoute(this.config.speed) });
                        CreatePosint.call(this, this.points[i]);
                    }
                    this.context.stroke();

                    //canvasSize(this);
                    setInterval(function () {
                        refresh(me);
                    }, 50);
                }

                // 设置canvas大小
                function canvasSize() {
                    this.width = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
                    this.height = window.innerWeight || document.documentElement.clientHeight || document.body.clientHeight;
                }

                function refresh(traget) {
                    var me = traget;
                    me.context.clearRect(0, 0, me.width, me.height);
                    Move.call(me);
                    DrawLine.call(me);
                    Collision.call(me);
                }

                function CreateRandomRoute(speed) {
                    var x = CreatedRandomInt(-1 * speed, speed);
                    var y = CreatedRandomInt(-1 * speed, speed);
                    while (x == 0 && y == 0) {
                        var x = CreatedRandomInt(-1 * speed, speed);
                        var y = CreatedRandomInt(-1 * speed, speed);
                    }
                    return { x: x, y: y };
                }

                function CreatePosint(point) {
                    this.context.fillStyle = "rgba( " + this.config.color + ",100)";
                    this.context.fillRect(point.x, point.y, point.width, point.height);
                }
                                
                function CreateLine(x1, y1, x2, y2, dist) {
                    this.context.lineWidth = 0.5 - dist / this.config.dist;
                    this.context.strokeStyle = "rgba( " + this.config.stroke+"," + (1 - dist / this.config.dist) + ")";
                    this.context.beginPath();
                    this.context.moveTo(x1, y1);
                    this.context.lineTo(x2, y2);
                    this.context.stroke();
                }

                function CreateRandomXY() {
                    return {
                        x: Math.floor(Math.random() * this.width),
                        y: Math.floor(Math.random() * this.height)
                    };
                }

                function Move() {
                    for (i = 0; i < this.points.length; i++) {
                        var point = this.points[i];
                        point.x += point.moveRoute.x;
                        point.y += point.moveRoute.y;
                        if (point.x >= this.width) {
                            point.x = this.width - 1;
                            point.moveRoute.x = point.moveRoute.x * -1;
                        }

                        if (point.x <= 0) {
                            point.x = 1;
                            point.moveRoute.x = point.moveRoute.x * -1;
                        }

                        if (point.y >= this.height) {
                            point.y = this.height - 1;
                            point.moveRoute.y = point.moveRoute.y * -1
                        }

                        if (point.y <= 0) {
                            point.y = 1;
                            point.moveRoute.y = point.moveRoute.y * -1;
                        }

                        // 如果鼠标进入画布
                        if (this.mouse) {
                            var mouse = this.mouse;
                            var dist = Math.sqrt(Math.pow(Math.round(this.points[i].x - mouse.x), 2) + Math.pow(Math.round(this.points[i].y - mouse.y), 2));

                            // 遇到鼠标吸附距离时加速，直接改变point的x，y值达到加速效果
                            if (dist > this.config.dist && dist <= this.config.e_dist) {
                                this.points[i].x = this.points[i].x + (mouse.x - this.points[i].x) / 20;
                                this.points[i].y = this.points[i].y + (mouse.y - this.points[i].y) / 20;
                            }
                            if (dist <= this.config.e_dist) {
                                this.context.lineWidth = 1;
                                this.context.strokeStyle = "rgba(" + this.config.stroke + "," + (1 - dist / this.config.e_dist) + ")";
                                this.context.beginPath();
                                this.context.moveTo(this.points[i].x, this.points[i].y);
                                this.context.lineTo(mouse.x, mouse.y);
                                this.context.stroke();
                            }
                        }

                        CreatePosint.call(this, point);
                    }
                }

                function DrawLine() {
                    for (var i = 0, len = this.config.count; i < len; i++) {
                        // 初始化最大连接数
                        this.points[i].max_conn = 0;
                        for (var j = 0; j < len; j++) {
                            if (i != j) {
                                //计算两点距离
                                var dist = Math.sqrt(Math.pow(Math.round(this.points[i].x - this.points[j].x), 2) + Math.pow(Math.round(this.points[i].y - this.points[j].y), 2));
                                // 两点距离小于吸附距离，而且小于最大连接数，则画线
                                if (dist <= this.config.dist && this.points[i].max_conn < this.config.max_conn) {
                                    this.points[i].max_conn++;
                                    CreateLine.call(this, this.points[i].x, this.points[i].y, this.points[j].x, this.points[j].y, dist);
                                }
                            }
                        }
                    }
                }

                function Collision() {
                    for (var i = 0, len = this.config.count; i < len; i++) {
                        for (var j = 0; j < len; j++) {
                            if (i != j) {
                                //计算两点距离
                                var dist = Math.sqrt(Math.pow(Math.round(this.points[i].x - this.points[j].x), 2) + Math.pow(Math.round(this.points[i].y - this.points[j].y), 2));
                                // 两点距离小于碰撞距离，则改变路线
                                if (dist <= this.config.collDist) {

                                    var x1 = this.points[i].x,
                                        y1 = this.points[i].y,
                                        x2 = this.points[j].x,
                                        y2 = this.points[j].y;

                                    var moveRouteX1 = this.points[i].moveRoute.x,
                                        moveRouteY1 = this.points[i].moveRoute.y,
                                        moveRouteX2 = this.points[j].moveRoute.x,
                                        moveRouteY2 = this.points[j].moveRoute.y;

                                    if (x1 > x2 && moveRouteX1 < moveRouteX2) {
                                        this.points[i].moveRoute.x = moveRouteX2;
                                        this.points[j].moveRoute.x = moveRouteX1;
                                    }

                                    if (y1 > y2 && moveRouteY1 < moveRouteY2) {
                                        this.points[i].moveRoute.y = moveRouteY2;
                                        this.points[j].moveRoute.y = moveRouteY1;
                                    }

                                    //this.points[i].moveRoute.x = x2;
                                    //this.points[i].moveRoute.y = y2;
                                    //this.points[j].moveRoute.x = x1;
                                    //this.points[j].moveRoute.y = y1;
                                }
                            }
                        }
                    }
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

                init.call(this);
            }
            Canvas.prototype.SetConfig = function (config) {
                this.config = config;
            };
            Canvas.prototype.SetMoveSpeed = function (x,y) {
                this.config.MoveSpeed = { x: x, y: y };
            };
        }()
    );