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


