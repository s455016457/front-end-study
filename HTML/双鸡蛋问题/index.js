(function(window) {
    class MK {
        constructor(k) {
            this.K = k; //从K层扔
            this.M = 0; //需要扔的次数
        }
    }
    class doubleEegs {
        constructor(lc, jds) {
            this.louceng = parseInt(lc);
            this.jidanshu = parseInt(jds);
            this.cache = new Array(this.louceng);
            for (var i = 0; i < this.louceng; i++) {
                this.cache[i] = new Array(this.jidanshu);
                for (var j = 0; j < this.jidanshu; j++) {
                    if (i === 1) { this.cache[i][j] = 1; continue; }
                    if (i === 2) { this.cache[i][j] = 2; continue; }
                    if (j === 1) { this.cache[i][j] = i; continue; }
                    this.cache[i][j] = -1;
                }
            }
        }
        jisuan = function() {
            var v = this.js(this.louceng, this.jidanshu);
            /**
            for (var i = 0; i < this.louceng; i++) {
                for (var j = 0; j < this.jidanshu; j++) {
                    if (this.cache[i][j] > 0) {
                        var index1 = i + 1,
                            index2 = j + 1;
                        console.debug("楼层【" + index1 + "】鸡蛋数【" + index2 + "】需要扔【" + this.cache[i][j] + "】次");
                    }
                }
            } */
            return v;
        };
        js = function(lcT, jdN) {
            if (lcT === 0) return 0;
            if (jdN === 0) return Number.MAX_VALUE;
            if (this.cache[lcT - 1, jdN - 1] > 0)
                return this.cache[lcT - 1, jdN - 1];
            var minMK = new MK(1);
            minMK.M = lcT;
            for (var k = 1; k <= lcT; k++) {
                var mk = new MK(k);
                //鸡蛋碎 楼层为k-1,鸡蛋数-1
                var m1 = this.js(k - 1, jdN - 1);

                //鸡蛋没碎 楼层为lcT-k,鸡蛋数不变
                var m2 = this.js(lcT - k, jdN);

                mk.M = (m1 < m2 ? m2 : m1) + 1;
                //  console.debug("集合数据：楼层【" + lcT + "】鸡蛋数【" + jdN + "】从【" + mk.K + "】层开始扔，需要扔【" + mk.M + "】次")
                if (minMK.M > mk.M)
                    minMK = mk;
            }
            this.cache[lcT - 1][jdN - 1] = minMK.M;
            // console.debug("楼层【" + lcT + "】鸡蛋数【" + jdN + "】从【" + minMK.K + "】层开始扔，需要扔【" + minMK.M + "】次")
            return minMK.M;
        };
    }


    window.doubleEegs = doubleEegs;

    /**
    window.doubleEegs = function(lc, jds) {
        this.louceng = parseInt(lc);
        this.jidanshu = parseInt(jds);
        this.jisuan = function() {

            return js(this.louceng, jidanshu);
        }

        var js = function(lcT, jdN) {
            if (jdN === 1)
                return lcT || 1;
            if (lcT === 1 || lcT === 0) return 1;
            if (lcT === 2) return 2;
            var minMK = new MK(1);
            minMK.M = lcT;
            for (var k = 1; k <= lcT; k++) {
                var mk = new MK(k);
                //鸡蛋碎 楼层为k-1,鸡蛋数-1
                var m1 = js(k - 1, jdN - 1);

                //鸡蛋没碎 楼层为lcT-k,鸡蛋数不变
                var m2 = js(lcT - k, jdN);

                mk.M = (m1 < m2 ? m2 : m1) + 1;
                //  console.debug("集合数据：楼层【" + lcT + "】鸡蛋数【" + jdN + "】从【" + mk.K + "】层开始扔，需要扔【" + mk.M + "】次")
                if (minMK.M > mk.M)
                    minMK = mk;
            }
            // console.debug("楼层【" + lcT + "】鸡蛋数【" + jdN + "】从【" + minMK.K + "】层开始扔，需要扔【" + minMK.M + "】次")
            return minMK.M;
        }


        return this;
    } */

})(window);