var listModel = function(items) {
    var self = this;

    this.newItem = new function() {
        this.name = ko.observable("");
        this.fanyi = ko.observable("");
        this.paiban = ko.observable("");

        this.toJson = function() {
            return JSON.parse(ko.toJSON(this));
        };

        this.clear = function() {
            this.name("");
            this.fanyi("");
            this.paiban("");
        };
    };
    this.allItems = ko.observableArray(items);
    this.allLogs = ko.observableArray([]);

    this.addItem = function() {
        var data = this.newItem.toJson();
        console.log(data);
        if (this.allItems.indexOf(data) < 0) {
            this.allItems.push(data);
            this.newItem.clear();
        }

    }.bind(this);

    this.removeItem = function() {
        self.allItems.remove(this);
    };

    /**
     * 自由组合所有项目
     * 并在组合中找出用时最少组合
     */
    this.jisuan = function() {
        this.addLog("开始计算。。。");
        var data = this.allItems();
        var bestTime;
        data = combination(data);

        for (var i = 0; i < data.length; i++) {
            var time = this.js(data[i]);

            this.addLog("排列顺序：" + time.key + " 理想时间：" + time.lixiangTime + " 等待时间：" + time.dengdaiTime + " 实际时间：" + time.totalTime);

            if (!bestTime)
                bestTime = time;
            else if (bestTime.totalTime > time.totalTime) {
                bestTime = time;
            }
        }

        this.addLog("最优排列顺序：" + bestTime.key + " 理想时间：" + bestTime.lixiangTime + " 等待时间：" + bestTime.dengdaiTime + " 实际时间：" + bestTime.totalTime)

        this.addLog("开始结束。。。");
    }.bind(this);

    this.addLog = function(mesage) {
        this.allLogs.push(mesage);
        var log = document.querySelector("#log")
        log.scrollTop = log.scrollHeight;
    };

    /**
     * 排程实际时间
     * 实际时间=理想时间+等待时间
     */
    this.js = function(data) {
        var lixiangTime = this.lixiangTime(data);
        var dengdaiTime = this.dengdaiTime(data);
        var obj = {
            key: "",
            lixiangTime: lixiangTime,
            dengdaiTime: dengdaiTime,
            totalTime: lixiangTime + dengdaiTime
        }
        for (var i = 0; i < data.length; i++) {
            obj.key += data[i].name;
        }
        return obj;
    };

    /**
     * 理想时间
     * 设排程ABC
     * 理想时间=A.翻译+B.翻译+C.翻译+C.排版
     */
    this.lixiangTime = function(data) {
        var time = 0;
        for (var i = 0; i < data.length; i++) {
            if (i === data.length - 1)
                return time += parseInt(data[i].paiban) + parseInt(data[i].fanyi);
            time += parseInt(data[i].fanyi);
        }
    };
    /***
     * 翻译等待时间
     * 设排程ABC
     * B排版等待时间=A.排版时间-B.翻译时间
     * C排版等待时间=B排版时间+B排版等待时间-C翻译时间
     * 时间不能小于0
     */
    this.dengdaiTime = function(data) {
        var time = 0;
        for (var i = 1; i < data.length; i++) {
            time = parseInt(time) + parseInt(data[i - 1].paiban) - parseInt(data[i].fanyi);
            time = time < 0 ? 0 : time;
        }
        return time;
    };
}

var items = [{
    name: "A",
    fanyi: 20,
    paiban: 13
}, {
    name: "B",
    fanyi: 4,
    paiban: 10
}, {
    name: "C",
    fanyi: 13,
    paiban: 3
}];

ko.applyBindings(new listModel(items));

/**
 * 数组中的元素自由组合
 * @param {*} array 
 * 
 * 思路
 * 考虑序列 [P1,P2,P3,...,Pn] 可以分解为 P1 与 C([P2,P3,...,Pn])的结果组合,依此类推. 
 */
function combination(array) {
    var newArray = new Array();
    if (array.length === 1) {
        newArray.push(array[0]);
        return newArray;
    }
    if (array.length === 2) {
        newArray.push([array[0], array[1]]);
        newArray.push([array[1], array[0]]);
        return newArray;
    }
    for (var i = 0; i < array.length; i++) {
        var copyArray = array.slice(0);
        var time = copyArray.splice(i, 1);
        var nna = combination(copyArray);
        for (var j = 0; j < nna.length; j++) {
            newArray.push(time.concat(nna[j]));
        }
    }
    return newArray;
}