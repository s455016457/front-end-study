/**
 * 变量申明
 * */

/**
 * var 声明变量
 * var全局变量
 * */
{
    function f1() {
        var a = 10;
        return function g() {
            var b = a + 1;
            return b;
        }
    }

    var g = f1();
    g(); // returns 11;
}
{
    function f2(shouldInitialize: boolean) {
        if (shouldInitialize) {
            var x = 10;
        }

        return x;
    }

    f2(true);  // returns '10'
    f2(false); // returns 'undefined'
}
{
    for (var i = 0; i < 10; i++) {
        setTimeout(function () { console.log(i); }, 100 * i);
    }

    /**
     * 控制台输出
     * 10 10 10 10 10 10 10 10 10 10
     * */
}

/**
 * let
 * let 块级作用域
 * */
{
    function f3(input: boolean) {
        let a = 100;

        if (input) {
            // Still okay to reference 'a'
            let b = a + 1;
            return b;
        }

        // Error: 'b' doesn't exist here
        // return b;
    }
}
{
    //a++; // 在声明“a”之前使用“a”是非法的;
    //let a;
}
{
    //function foo() {
    //    // okay to capture 'a'
    //    return a;
    //}

    //// 不能在'a'被声明前调用'foo'
    //// 运行时应该抛出错误
    //foo();

    //let a;
}
/**
 * 并不是要求两个均是块级作用域的声明TypeScript才会给出一个错误的警告。
 * */
{
    //function f(x) {
    //    let x = 100; // error: interferes with parameter declaration
    //}

    //function g() {
    //    let x = 100;
    //    var x = 100; // error: can't have both declarations of 'x'
    //}
}
/**
 * 并不是说块级作用域变量不能用函数作用域变量来声明。 
 * 而是块级作用域变量需要在明显不同的块里声明。
 * */
{
    function f(condition: Boolean, x: number) {
        if (condition) {
            let x = 100;
            return x;
        }

        return x;
    }

    f(false, 0); // returns 0
    f(true, 0);  // returns 100
}

/**
 * 在一个嵌套作用域里引入一个新名字的行为称做屏蔽。 
 * 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误。
 * 例如，假设我们现在用 let重写之前的sumMatrix函数。
 * */
{
    function sumMatrix(matrix: number[][]) {
        let sum = 0;
        for (let i = 0; i < matrix.length; i++) {
            var currentRow = matrix[i];
            for (let i = 0; i < currentRow.length; i++) {
                sum += currentRow[i];
            }
        }

        return sum;
    }
    /**
     * 这个版本的循环能得到正确的结果，因为内层循环的i可以屏蔽掉外层循环的i。
     * */
}
{
    for (let i = 0; i < 10; i++) {
        setTimeout(function () { console.log(i); }, 100 * i);
    }
    /**
     * 控制台输出
     * 0 1 2 3 4 5 6 7 8 9
     * */
}

/**
 * const 声明
 * const 作用于与let相同，只是const是常量，只能在申明时赋值，其它地方只能读取
 * */
{
    const numLivesForCat = 9;
    const kitty = {
        name: "Aurora",
        numLives: numLivesForCat,
    }

    // Error
    //kitty = {
    //    name: "Danielle",
    //    numLives: numLivesForCat
    //};

    // all "okay"
    kitty.name = "Rory";
    kitty.name = "Kitty";
    kitty.name = "Cat";
    kitty.numLives--;
}

/**
 * 解构
 * */
/**
 * 解构数组
 * */
/**
 * 数组结构赋值
 * */
{
    let input: [number, number] = [1, 2];
    let [first, second] = input;
    console.log(first); // outputs 1
    console.log(second); // outputs 2
    [first, second] = [second, first];  //数据交换

    //作用于函数参数
    function f4([first, second]: [number, number]) {
        console.log(first);
        console.log(second);
    }
    f4(input);

}
/**
 * 可以在数组里使用...语法创建剩余变量
 * */
{
    let [first, ...rest] = [1, 2, 3, 4];
    console.log(first); // outputs 1
    console.log(rest); // outputs [ 2, 3, 4 ]
}
/**
 * 由于是JavaScript, 你可以忽略你不关心的尾随元素：
 * */
{
    let [first] = [1, 2, 3, 4];
    console.log(first); // outputs 1
    let [, second, , fourth] = [1, 2, 3, 4]; //获取其它元素
    console.log(second); // outputs 2
    console.log(fourth); // outputs 3
}

/**
 * 对象解构
 * */
{
    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    let { a, b } = o;   // 这通过 o.a and o.b 创建了 a 和 b 。 注意，如果你不需要 c 你可以忽略它。

    // 就像数组解构，你可以用没有声明的赋值：
    ({ a, b } = { a: "baz", b: 101 });
}
/**
 * 你可以在对象里使用...语法创建剩余变量：
 * */
{
    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    };

    let { a, ...passthrough } = o;
    let total = passthrough.b + passthrough.c.length;
}

/**
 * 属性重命名
 * 你也可以给属性以不同的名字
 * */
{
    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    let { a: newName1, b: newName2 } = o; // 等效：let newName1 = o.a; let newName2 = o.b;
}

/**
 * 默认值
 * 默认值可以让你在属性为 undefined 时使用缺省值：
 * */
{
    function keepWholeObject(wholeObject: { a: string, b?: number }) {
        let { a, b = 1001 } = wholeObject;
    }
    // 现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。
}

/**
 * 函数声明
 * */
{
    type C = { a: string, b?: number }
    function f6({ a, b }: C): void {
        // ...
    }
    f6({ a: "", b: 0 });
}
{
    function f7({ a = "", b = 0 } = {}): void {
        // ...
    }
    f7();
}
{
    function f8({ a, b = 0 } = { a: "" }): void {
        // ...
    }
    f8({ a: "yes" }); // ok, default b = 0
    f8(); // ok, default to {a: ""}, which then defaults b = 0
    // f8({}); // error, 'a' is required if you supply an argument
}


/**
 * 展开
 * 展开操作符正与解构相反。 它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。 例如：
 * */
{
    let first = [1, 2];
    let second = [3, 4];
    let bothPlus = [0, ...first, ...second, 5];
    /**
     * 这会令bothPlus的值为[0, 1, 2, 3, 4, 5]
     * 展开操作创建了 first和second的一份浅拷贝。 它们不会被展开操作所改变
     * */
}
/**
 * 你还可以展开对象：
 * */
{
    let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    let search = { ...defaults, food: "rich" };
    /**
     * search的值为{ food: "rich", price: "$$", ambiance: "noisy" }。 
     * */
}
/**
 * 对象的展开比数组的展开要复杂的多。
 * 像数组展开一样，它是从左至右进行处理，但结果仍为对象。
 * 这就意味着出现在展开对象后面的属性会覆盖前面的属性。
 * 因此，如果我们修改上面的例子，在结尾处进行展开的话：
 * */
{
    let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    let search = { food: "rich", ...defaults };
    /**
     * search的值为{ food: "spicy", price: "$$", ambiance: "noisy" }。
     * */
}
/**
 * 对象展开还有其它一些意想不到的限制。
 * 首先，它仅包含对象 自身的可枚举属性。
 * 大体上是说当你展开一个对象实例时，
 * 你会丢失其方法：
 * */
{
    class C {
        p = 12;
        m() {
        }
    }
    let c = new C();
    let clone = { ...c };
    clone.p; // ok
    //clone.m(); // error!
}

// TypeScript编译器不允许展开泛型函数上的类型参数。 这个特性会在TypeScript的未来版本中考虑实现。