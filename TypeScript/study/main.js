var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/**
 * 基础类型
*/
{
    var isDone = false; // boolean 类型
    var decLiteral = 6; // 十进制
    var hexLiteral = 0xf00d; // 十六进制
    var binaryLiteral = 10; // 二进制
    var octalLiteral = 484; // 八进制
    var name_1 = "bob"; // 字符串
    name_1 = "smith";
}
/**
 * 模版字符串
 * 它可以定义多行文本和内嵌表达式。
 * 这种字符串是被反引号包围（ `）
 * 并且以${ expr }这种形式嵌入表达式
*/
{
    var name_2 = "Gene";
    var age = 37;
    var sentence = "Hello,my name is " + name_2 + ".\n\n\tI'll be " + (age + 1) + " years old next month.";
    var list = [1, 2, 3]; // 数组
    var list2 = [1, 2, 3]; // 数组
}
/*
 * 元组Tuple
 * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
 * 比如，你可以定义一对值分别为 string和number类型的元组。
 * */
{
    var x = void 0;
    x = ['hello', 10]; // 正确的初始化
    // x = [10,'hello'];// 错误的初始化
    console.log(x[0].substr(1)); //正确的使用
    //console.log(x[1].substr(1));	//错误的使用，会出现异常 'number' dose not have 'substr'
    //x[3] = 'world'; 				// Property '3' does not exist on type '[string, number]'.
    //console.log(x[5].toString()); // Property '5' does not exist on type '[string, number]'.
    //x[6] = true; 					// Property '6' does not exist on type '[string, number]'.
}
/**
 * 枚举
 * enum类型是对JavaScript标准数据类型的一个补充。
 * 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
 * */
{
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 0] = "Red";
        Color[Color["Green"] = 1] = "Green";
        Color[Color["Blue"] = 2] = "Blue";
    })(Color || (Color = {}));
    var c = Color.Green;
}
/**
 * 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
 * 例如，我们将上面的例子改成从 1开始编号：
 * */
{
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Blue"] = 3] = "Blue";
    })(Color || (Color = {}));
    var c = Color.Green;
}
/**
 * 或者，全部都采用手动赋值：
 * */
{
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Blue"] = 3] = "Blue";
    })(Color || (Color = {}));
    var c = Color.Green;
}
/**
 * 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。
 * 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字
 * 我们可以查找相应的名字：
 * */
{
    var Color = void 0;
    (function (Color) {
        Color[Color["Red"] = 1] = "Red";
        Color[Color["Green"] = 2] = "Green";
        Color[Color["Blue"] = 3] = "Blue";
    })(Color || (Color = {}));
    var colorName = Color[2];
    console.log(colorName); // 显示'Green'，因为上面电码里他的值是2
}
/**
 * Any
 * 有时候，我们会想要为哪些在编程阶段还不清楚的变量指定一个类型。
 * 这些值可能来自于动态的内容，比如来自用户输入或者第三方代码库。
 * 这种情况下，我们不希望类型检测器对这些值进行检查
 * 而是直接让他们通过编译阶段的检查。
 * 那么我们可以使用按压类型来标记这些变量
 * */
{
    var notSure = 4;
    notSure = "maybe a string instead";
    notSure = false; // 也可以定义为一个boolean类型 
}
/**
 * Any 与 object 不相同
 * object 类型的变量只是允许你给它赋任意值，
 * 但是不能在它上面调用任意的方法，即便它真的拥有这些方法
 * */
{
    var notSure = 4;
    notSure.ifItExists(); // ifItExists可能在运行时存在
    notSure.toFixed(); // toFixed 存在(编译器不检查)
    var prettySure = 4;
    //prettySure.toFixed(); // rror: Property 'toFixed' doesn't exist on type 'Object'.
}
/**
 * 当你只知道一部分数据的类型时，any类型也是有用的
 * 比如，你有一个数组，它包含了不同的类型的数据：
 * */
{
    var list = [1, true, "free"];
    list[1] = 100;
}
/**
 * Viod
 * 某种程度上来说，void类型像是与any类型想法，它表示没有任何类型。
 * 当一个函数没有返回值时，你通常会见到其发挥值类型是void:
 * */
{
    function warnUser() {
        console.log("This is my warning message");
    }
}
/**
 * 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null:
 * */
{
    var unusable = undefined;
}
/**
 * Null 和 undefined
 * TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。
 * 和void相似，他们的本身类型用处不是很大：
 * */
{
    // 除此之外，我们不能给这些变量赋其他值!
    var u = undefined;
    var n = null;
    /**
     * 默认情况下null和undefined是所有类型的子类型。
     * 就是说你可以把 null和undefined赋值给number类型的变量。
     * 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自。
     * 这能避免 很多常见的问题。
     * 也许在某处你想传入一个 string或null或undefined，你可以使用联合类型string | null | undefined。
     * */
}
/**
 * Never
 * Never 类型表示的是那些永远不存在的值的类型。
 * 例如，never类型是哪些总是抛出异常或者根本就不会有返回值的函数表达式或箭头函数表达式的返回值；
 * 变量也可能是never类型，当他们被永远不会为真的类型保护所约束时。
 * never类型是任何类型的子类型，也可以赋值给任何类型；
 * 然而，没有类型是never的子类型或者可以负责给never类型（除了never本身之外）。
 * 即使any也不可以赋值给never
 * */
{
    // 返回never的函数必须存在无法达到的终点
    function error(message) {
        throw new Error(message);
    }
    // 推断的返回类型为never
    function fail() {
        return error("Something failed");
    }
    // 返回never的函数必须存在无法达到的终点
    function infiniteLoop() {
        while (true) {
        }
    }
}
{
    create({ prop: 0 });
    create(null);
    //create(43);       //Error
    //create("string"); //Error
    //create(false);    //Error
    //create(undefined);//Error
    //create(null);     //Error
}
/**
 * 类型断言
 * 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。
 * 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。
 * 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。
 * 类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构。
 * 它没有运行时的影响，只是在编译阶段起作用。
 * TypeScript会假设你已经进行了必须的检查。
 * */
{
    var someValue = "this is string";
    var strLength = someValue.length; //尖括号语法
    strLength = someValue.length; //as语法
}
/**
 * 接口
 * */
/**
 * 简单接口
 * */
{
    /**
     * 打印标签
     *
     * @param labelledObject 标签对象
     */
    function printLabel1(labelledObject) {
        console.log(labelledObject.label);
    }
    var myObject = { size: 10, label: "Size 10 object" };
    // 只要对象满足接口中的属性，都可以作为参数传入
    printLabel1(myObject);
}
{
    /**
     * 打印标签
     * @param labelledValue 标签值
     */
    function printLabel2(labelledValue) {
        console.log(labelledValue.label);
    }
    var myObject = { size: 10, label: "Size 10 object" };
    /**
     * 只要对象满足接口中的属性，都可以作为参数传入。
     * 需要注意的是，我们在这里并不能像在其它语言里一样，说传给 printLabel的对象实现了这个接口。
     * 我们只会去关注值的外形。 只要传入的对象满足上面提到的必要条件，那么它就是被允许的。
     * 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。
     * */
    printLabel2(myObject);
}
/**
 * 可选属性
 * 接口里的属性不全都是必须的。有些知识在默写条件下存在，或者根本不存在
 * 可选属性在应用“option bags”模式很常用
 * 即给函数传入的参数对象中只有部分属性赋值了。
 * */
{
    /**
     * 创建正方形
     * @param config
     * @returns 正方形
     * : { color: string; area: number }  返回类型
     */
    function createSquare(config) {
        var newSequare = { color: "white", area: 100 };
        if (config.color) {
            newSequare.color = config.color;
        }
        if (config.width) {
            newSequare.area = config.width * config.width;
        }
        return newSequare;
    }
    var mySequare = createSquare({ color: "blacek" });
}
/**
 * 只读属性
 * 一些对象属性只能在对象刚刚创建的时候修改其值
 * 你可以在属性名前用 readonly 来指定只读属性
 * */
{
    // 你可以通过赋值一个对象字面来够着一个Point。赋值后，x和y再也不能被改变了。
    var p1 = { x: 10, y: 20 };
    p1.x = 5; //error
}
//ts语法
var person = /** @class */ (function () {
    function person(name) {
        this.name = name;
    }
    person.prototype.getname = function () {
        return this.name;
    };
    ;
    person.prototype.setname = function (name) {
        this.name = name;
    };
    return person;
}());
var p = new person('张三');
alert(p.getname());
p.setname('李四');
alert(p.getname());
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.innerHTML = greeter(user);
/**
 * 变量申明
 * */
var _a, _b;
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
        };
    }
    var g = f1();
    g(); // returns 11;
}
{
    function f2(shouldInitialize) {
        if (shouldInitialize) {
            var x = 10;
        }
        return x;
    }
    f2(true); // returns '10'
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
    function f3(input) {
        var a = 100;
        if (input) {
            // Still okay to reference 'a'
            var b = a + 1;
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
    function f(condition, x) {
        if (condition) {
            var x_1 = 100;
            return x_1;
        }
        return x;
    }
    f(false, 0); // returns 0
    f(true, 0); // returns 100
}
/**
 * 在一个嵌套作用域里引入一个新名字的行为称做屏蔽。
 * 它是一把双刃剑，它可能会不小心地引入新问题，同时也可能会解决一些错误。
 * 例如，假设我们现在用 let重写之前的sumMatrix函数。
 * */
{
    function sumMatrix(matrix) {
        var sum = 0;
        for (var i_1 = 0; i_1 < matrix.length; i_1++) {
            var currentRow = matrix[i_1];
            for (var i_2 = 0; i_2 < currentRow.length; i_2++) {
                sum += currentRow[i_2];
            }
        }
        return sum;
    }
    /**
     * 这个版本的循环能得到正确的结果，因为内层循环的i可以屏蔽掉外层循环的i。
     * */
}
{
    var _loop_1 = function (i_3) {
        setTimeout(function () { console.log(i_3); }, 100 * i_3);
    };
    for (var i_3 = 0; i_3 < 10; i_3++) {
        _loop_1(i_3);
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
    var numLivesForCat = 9;
    var kitty = {
        name: "Aurora",
        numLives: numLivesForCat
    };
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
    var input = [1, 2];
    var first = input[0], second = input[1];
    console.log(first); // outputs 1
    console.log(second); // outputs 2
    _a = [second, first], first = _a[0], second = _a[1]; //数据交换
    //作用于函数参数
    function f4(_a) {
        var first = _a[0], second = _a[1];
        console.log(first);
        console.log(second);
    }
    f4(input);
}
/**
 * 可以在数组里使用...语法创建剩余变量
 * */
{
    var _c = [1, 2, 3, 4], first = _c[0], rest = _c.slice(1);
    console.log(first); // outputs 1
    console.log(rest); // outputs [ 2, 3, 4 ]
}
/**
 * 由于是JavaScript, 你可以忽略你不关心的尾随元素：
 * */
{
    var first = [1, 2, 3, 4][0];
    console.log(first); // outputs 1
    var _d = [1, 2, 3, 4], second = _d[1], fourth = _d[3]; //获取其它元素
    console.log(second); // outputs 2
    console.log(fourth); // outputs 3
}
/**
 * 对象解构
 * */
{
    var o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    var a = o.a, b = o.b; // 这通过 o.a and o.b 创建了 a 和 b 。 注意，如果你不需要 c 你可以忽略它。
    // 就像数组解构，你可以用没有声明的赋值：
    (_b = { a: "baz", b: 101 }, a = _b.a, b = _b.b);
}
/**
 * 你可以在对象里使用...语法创建剩余变量：
 * */
{
    var o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    var a = o.a, passthrough = __rest(o, ["a"]);
    var total = passthrough.b + passthrough.c.length;
}
/**
 * 属性重命名
 * 你也可以给属性以不同的名字
 * */
{
    var o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    var newName1 = o.a, newName2 = o.b; // 等效：let newName1 = o.a; let newName2 = o.b;
}
/**
 * 默认值
 * 默认值可以让你在属性为 undefined 时使用缺省值：
 * */
{
    function keepWholeObject(wholeObject) {
        var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
    }
    // 现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。
}
/**
 * 函数声明
 * */
{
    function f6(_a) {
        var a = _a.a, b = _a.b;
        // ...
    }
    f6({ a: "", b: 0 });
}
{
    function f7(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.a, a = _c === void 0 ? "" : _c, _d = _b.b, b = _d === void 0 ? 0 : _d;
        // ...
    }
    f7();
}
{
    function f8(_a) {
        var _b = _a === void 0 ? { a: "" } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
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
    var first = [1, 2];
    var second = [3, 4];
    var bothPlus = [0].concat(first, second, [5]);
    /**
     * 这会令bothPlus的值为[0, 1, 2, 3, 4, 5]
     * 展开操作创建了 first和second的一份浅拷贝。 它们不会被展开操作所改变
     * */
}
/**
 * 你还可以展开对象：
 * */
{
    var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    var search = __assign({}, defaults, { food: "rich" });
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
    var defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    var search = __assign({ food: "rich" }, defaults);
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
    var C = /** @class */ (function () {
        function C() {
            this.p = 12;
        }
        C.prototype.m = function () {
        };
        return C;
    }());
    var c = new C();
    var clone = __assign({}, c);
    clone.p; // ok
    //clone.m(); // error!
}
// TypeScript编译器不允许展开泛型函数上的类型参数。 这个特性会在TypeScript的未来版本中考虑实现。
//# sourceMappingURL=main.js.map