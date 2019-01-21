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
    function printLabel1(labelledObject: { label: string }) {
        console.log(labelledObject.label);
    }

    let myObject = { size: 10, label: "Size 10 object" };
    // 只要对象满足接口中的属性，都可以作为参数传入
    printLabel1(myObject);
}

{
    /**
     * 标签值
     * */
    interface LabelledValue {
        /**
         * 标签
         * */
        label: string;
    }

    /**
     * 打印标签
     * @param labelledValue 标签值
     */
    function printLabel2(labelledValue: LabelledValue) {
        console.log(labelledValue.label);
    }

    let myObject = { size: 10, label: "Size 10 object" };
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
     * 正方形的配置
     * 带有可选属性的接口
     * 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个?符号。
     * */
    interface SquareConfig {
        color?: string;
        width?: number;
    }

    /**
     * 创建正方形
     * @param config
     * @returns 正方形
     * : { color: string; area: number }  返回类型
     */
    function createSquare(config: SquareConfig): { color: string; area: number }{
        let newSequare = { color: "white", area: 100 };
        if (config.color) {
            newSequare.color = config.color;
        }
        if (config.width) {
            newSequare.area = config.width * config.width;
        }
        return newSequare;
    }

    let mySequare = createSquare({ color: "blacek" });

    // 可选属性接口不能传入接口外的属性
    // let mySequare2 = createSquare({ width: 100, opacity: 0.5 }); // eror 'opacity' not in type 'SquareConfig'

    let mySequare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig); // 使用类型断言可以绕开这些检查

    /**
     * 最好的处理方式是能够添加一个字符串索引签名
     * 前提是你能够确定这个对象可能具有某些作为特殊用途使用的额外属性。
     * 如果SquareConfig带有上面定义的类型的color和width属性，
     * 并且还会带有任意数量的其他属性，那么我们可以这样定义他：
     * */
    interface SquareConfig2 {
        color?: string;
        width?: number;
        [propName: string]: any;
    }
    function createSquare2(config: SquareConfig2): { color: string; area: number } {
        let newSequare = { color: "white", area: 100 };
        if (config.color) {
            newSequare.color = config.color;
        }
        if (config.width) {
            newSequare.area = config.width * config.width;
        }
        return newSequare;
    }
    let mySequare3 = createSquare2({ width: 100, opacity: 0.5 });

    /**
     * 还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，
     * 它就是将这个对象赋值给一个另一个变量： 
     * 因为 squareOptions不会经过额外属性检查，所以编译器不会报错。
     * */
    let squareOptions = { colour: "red", width: 100 };
    let mySquare4 = createSquare(squareOptions);
}

/**
 * 只读属性
 * 一些对象属性只能在对象刚刚创建的时候修改其值
 * 你可以在属性名前用 readonly 来指定只读属性
 * */
{
    /**
     * 坐标
     * */
    interface Point {
        readonly x: number;
        readonly y: number;
    }

    // 你可以通过赋值一个对象字面来够着一个Point。赋值后，x和y再也不能被改变了。
    let p1: Point = { x: 10, y: 20 };
    // p1.x = 5; //error

    /**
     * TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了
     * 因此可以确保数组创建后再也不能被修改
     * */
    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    // ro[0] = 12; // error
    // ro.push(5); // error
    // or.length = 100; //error
    // a = ro; //error  
    /**
     * 将整个ReadonlyArray赋值到一个普通数组，是不可以的。
     * 但是可以用类型断言重写
     * */
    a = ro as number[];
}
/**
 * readonly Vs const
 * 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是作为一个属性
 * 作为变量使用的话用const，若作为属性则用readonly
 * */

/**
 * 函数类型
 * 接口能够描述JavaScript中对象拥有的各种各样的外形。
 * 除了描述带有属性的普通对象外，接口也可以描述函数类型。
 * */

/**
 * 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。
 * 它就像是一个只有参数列表和返回值类型的函数定义。
 * 参数列表里的每个参数都需要名字和类型。
 * */
;
{
    /**
     * 查询方法接口
    * */
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    let mySearch: SearchFunc;
    mySearch = function (source: string, subString: string) {
        let result = source.search(subString);
        return result > -1;
    }
    /**
     * 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
     * 比如，我们使用下面的代码重写上面的例子：
     * */
    mySearch = function (src: string, sub: string): boolean{
        let result = src.search(sub);
        return result > -1;
    }
    mySearch = function (src, sub) {
        let result = src.search(sub);
        return result > -1;
    }
}

/**
 * 可索引的类型
 * */
{
    // 定义了一个StringArray的接口
    interface StringArray {
        //定义了一个索引签名，用当前number去索引时会得到string类型的返回值
        [index: number]: string; 
    }

    let myArray: StringArray;
    myArray = ["Bob", "Fred"];

    let myStr: string = myArray[0];
}
{
    class Animal {
        name: string;
    }
    class Dog extends Animal {
        breed: string;
    }
    // 错误，使用数值型的字符串索引，有时会得到完全不同Animal！
    // 有可能是Dog
    //interface NotOkay{
    //    [x: number]: Animal;
    //    [x: string]: Dog;
    //}
    interface Okay{
        [x: number]: Animal;
        [x: string]: Animal;
    }

    /**
     * 可以将索引设置为只读类型，这样就防止了给索引赋值
     * */
    interface ReadonlyStringArray {
        readonly [index: number]: string;
    }
    let myArray: ReadonlyStringArray = ["Alic", "Bob"];
    //myArray[1] = "Mallory"; // 错误，索引签名只允许读取
}

/**
 * 类类型
 * */

/**
 * 实现接口
 * */
{
    /**
     * 时钟接口
     * */
    interface ClockInterface {
        /**
         * 当前时间
         * */
        currentTime: Date;
        /**
         * 设置时间
         * @param d
         */
        setTime(d: Date): void;
        /**
         * 获取时间
         * */
        getTime(): Date;
    }
    /**
     * 时钟
     * */
    class Clock implements ClockInterface {
        currentTime: Date;
        getTime(): Date {
            return this.currentTime;
        }
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) {}
    }
}

/**
 * 类静态部分与实力部分的区别
 * 当操作类和接口的时候，要知道类是具有两个类型的：
 * 静态部分的类型和实例的类型。
 * 你会注意到，当你用构造器签名去定义一个接口
 * 并试图定义一个类去实现这个接口时，会得到一个错误
 * */
{
    /**
    // 错误，缺少返回类型批注的构造签名隐式具有返回类型“Any”
    interface ClockConstructor {
        new(hour: number, minute: number);
    }

    class Colock implements ClockConstructor {
        currentTime: Date;
        constructor(h: number, m: number) {}
    } */
    ;
    // 正确的写法：
    // 定义接口
    interface ClockInterface {
        tick(): void;
    }
    // 定义构造器接口
    interface ClockConstructor {
        new(hour: number, minute: number): ClockInterface;
    }
    // 定义工厂方法
    function createClock(clor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new clor(hour, minute);
    }
    class DigitaClock implements ClockInterface {
        constructor(h: number, m: number) {}
        tick(): void {
            console.log("beep beep");
        }
    }
    class AnalogClock implements ClockInterface {
        constructor(h: number, m: number) {}
        tick(): void {
            console.log("tick tock");
        }
    }

    let digital = createClock(DigitaClock, 12, 7);
    let analog = createClock(AnalogClock, 7, 42);
}

/**
 * 继承接口
 * 和类一样，接口也可以相互继承。 
 * 这让我们能够从一个接口里复制成员到另一个接口里，
 * 可以更灵活地将接口分割到可重用的模块里。
 * */
{
    interface Shape {
        color: string;
    }
    interface PenStroke {
        penWidth: number;
    }
    interface Square extends Shape, PenStroke {
        sideLength: number;
    }

    let square = <Square>{};//匿名类
    square.color = "blue";
    square.sideLength = 10;
    square.penWidth = 5.0;
}

/**
 * 混合类型
 * 接口能够描述JavaScript里丰富的类型。 
 * 因为JavaScript其动态灵活的特点，
 * 有时你会希望一个对象可以同时具有上面提到的多种类型。
 * 在使用JavaScript第三方库的时候，可以这样去完整的定义类型。
 * */
{
    /**
     * 计数器接口
     * */
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }
    /**
     * 获取计数器
     * */
    function getCounter(): Counter {
        let counter = <Counter>function (start: number) { };
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;
}

/**
 * 接口继承
 * 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
 * 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。
 * 接口同样会继承到类的private和protected成员。
 * 这以为着当你创建了一个接口继承了一个拥有私有或受保护的成员类时，
 * 这个接口类型只能被这个类或其子类所实现(implement)
 * */
{
    class Control {
        private state: any;
    }
    interface SelectableContor extends Control {
        select(): void;
    }
    class Button extends Control implements SelectableContor {
        select() { }
    }
    class TextBox extends Control {
        select() {}
    }
    // 错误：“Image”类型缺少“state”属性
    //class Image implements SelectableContor {
    //    select() { }
    //}
    class Location {

    }
    /**
     * SelectableControl包含了Control的所有成员，包括私有成员state。
     * 因为 state是私有成员，所以只能够是Control的子类们才能实现SelectableControl接口。
     * 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，
     * 这对私有成员的兼容性是必需的。
     * */
}