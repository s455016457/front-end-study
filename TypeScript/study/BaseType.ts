/**
 * 基础类型
*/
{
	let isDone: boolean = false;			// boolean 类型
	let decLiteral: number = 6;				// 十进制
	let hexLiteral: number =0xf00d;			// 十六进制
	let binaryLiteral: number = 0b1010;		// 二进制
	let octalLiteral: number = 0o744;		// 八进制
	let name: string = "bob"				// 字符串
	name = "smith";
}

/**
 * 模版字符串
 * 它可以定义多行文本和内嵌表达式。 
 * 这种字符串是被反引号包围（ `）
 * 并且以${ expr }这种形式嵌入表达式
*/
{
	let name: string = "Gene";
	let age: number = 37;
	let sentence: string = `Hello,my name is ${ name }.

	I'll be ${ age+1 } years old next month.`;

	let list: number[] = [1,2,3];			// 数组
	let list2: Array<number> = [1,2,3];		// 数组
}

/*
 * 元组Tuple
 * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
 * 比如，你可以定义一对值分别为 string和number类型的元组。
 * */
{
	let x: [string,number];
	x = ['hello',10];	// 正确的初始化
	// x = [10,'hello'];// 错误的初始化
	console.log(x[0].substr(1));	//正确的使用
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
    enum Color { Red, Green, Blue }
    let c: Color = Color.Green;
}
/**
 * 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 
 * 例如，我们将上面的例子改成从 1开始编号：
 * */
{
    enum Color { Red=1, Green, Blue }
    let c: Color = Color.Green;
}
/**
 * 或者，全部都采用手动赋值：
 * */
{
    enum Color { Red = 1, Green = 2, Blue = 3 }
    let c: Color = Color.Green;
}
/**
 * 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 
 * 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字
 * 我们可以查找相应的名字：
 * */
{
    enum Color { Red = 1, Green, Blue }
    let colorName: string = Color[2];
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
    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false;    // 也可以定义为一个boolean类型 
}

/**
 * Any 与 object 不相同
 * object 类型的变量只是允许你给它赋任意值，
 * 但是不能在它上面调用任意的方法，即便它真的拥有这些方法
 * */
{
    let notSure: any = 4;
    notSure.ifItExists();   // ifItExists可能在运行时存在
    notSure.toFixed();      // toFixed 存在(编译器不检查)

    let prettySure: Object = 4;
    //prettySure.toFixed(); // rror: Property 'toFixed' doesn't exist on type 'Object'.
}
/**
 * 当你只知道一部分数据的类型时，any类型也是有用的
 * 比如，你有一个数组，它包含了不同的类型的数据：
 * */
{
    let list: any[] = [1, true, "free"];
    list[1] = 100;
}

/**
 * Viod
 * 某种程度上来说，void类型像是与any类型想法，它表示没有任何类型。
 * 当一个函数没有返回值时，你通常会见到其发挥值类型是void:
 * */
{
    function warnUser(): void {
        console.log("This is my warning message")
    }
}
/**
 * 声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null:
 * */
{
    let unusable: void = undefined;
}

/**
 * Null 和 undefined
 * TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。
 * 和void相似，他们的本身类型用处不是很大：
 * */
{
    // 除此之外，我们不能给这些变量赋其他值!
    let u: undefined = undefined;
    let n: null = null;

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
    function error(message: string): never {
        throw new Error(message);
    }

    // 推断的返回类型为never
    function fail() {
        return error("Something failed");
    }

    // 返回never的函数必须存在无法达到的终点
    function infiniteLoop(): never {
        while (true) {

        }
    }
}

/**
 * Object
 * object 表示非原始类型，也就是除number，string，boolean，symbol，null或者undefined之外的类型
 * 使用object类型，就可以更好的表示像Object.create这样的Api。
 * 例如：
 * */
declare function create(o: object | null): void;
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
    let someValue: any = "this is string";
    let strLength: number = (<string>someValue).length; //尖括号语法
    strLength = (someValue as string).length;           //as语法
}


