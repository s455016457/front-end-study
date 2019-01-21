/**
 * 类
 * */

{
    class Greeter {
        protected greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet(): string {
            return "Hello," + this.greeting;
        }
    }

    let greeter = new Greeter("world");
}

/**
 * 继承
 * */
{
    class Animal {
        protected name: string;
        constructor(theName: string) {
            this.name = theName;
        }
        public getName(): string {
            return name;
        }
        public move(distanceInMeters: number = 0): void {
            console.log("Animal moved ${distanceInMeters}m.");
        }
    }
    class Snake extends Animal {
        constructor(name: string) {
            super(name); // 在构造函数里访问 this的属性之前，必须先调用父类构造函数
        }
        // 重写父类方法
        move(distanceInMeters = 5) {
            console.log("Slithering...");
            super.move(distanceInMeters);// 调用父类方法
        }
    }
    class Horse extends Animal {
        constructor(name: string) {
            super(name); // 在构造函数里访问 this的属性之前，必须先调用父类构造函数
        }
        move(distanceInMeters = 45) {
            console.log("Galloping...");
            super.move(distanceInMeters);
        }
    }
    class Dog extends Animal {
        constructor(name: string) {
            super(name); // 在构造函数里访问 this的属性之前，必须先调用父类构造函数
        }
        public bark(): void {
            console.log("Woof!Woof!");
        }
    }
    const dog = new Dog("Toom");
    dog.bark();
    dog.move(100);
    dog.bark();
    let sam = new Snake("Samy the python");
    let tom: Animal = new Horse("Tommy the Palomino"); // 声明为Animal
    sam.move();
    tom.move(34); // 调用的 Horse 实例中的方法
}


/**
 * 公共、私有、与保护的修饰符
 * 成员默认为 public 公有的
 * private 私有的，不能在声明它的类的外部访问
 * protected 受保护的 与private相似，但是在派生类中仍可以访问
 * 
 * TypeScript使用的是结构性类型系统。
 * 当我们比较两种不同的类型时，并不在乎它们从何而来，如果所有成员类型都是兼容的，
 * 就认为他们类型是兼容的。
 * 当我们比较带有private或protected成员的类型的时候，情况就不同了。
 * 如果其中一个类型里包含一个private成员，那么只有当另一个类型中也存在这样一个private成员，
 * 并且他们都是来自同一处声明时，我们才认为这两个类型是兼容的。
 * 对于protected成员也使用这个规则。
 * */
{
    class Animal {
        private readonly name: string;
        constructor(theName: string) { this.name = theName; }
    }

    class Rhino extends Animal {
        constructor() { super("Rhino");}
    }

    class Dog extends Animal {
        protected color: string;
        private type: string
        constructor() { super("Dog");}
    }

    class Employee {
        private name: string;
        constructor(theName: string) { this.name = theName; }
    }

    let animal = new Animal("Goat");
    let rhino = new Rhino();
    let dog = new Dog();
    let employee = new Employee("Bob");
    animal = rhino;
    rhino = dog;
    //animal = employee; // 错误: Animal 与 Employee 不兼容.
}
{
    class Octopus {
        readonly name: string;
        readonly numberOfLegs: number = 8;
        constructor(theName: string) {
            this.name = theName;
        }
    }
    class Octopus1 {
        readonly numberOfLegs: number = 8;
        constructor(readonly name: string) {

        }
    }
    /**
     * Octopus1 等效于 Octopus
     * Octopus1 将name声明和赋值合并至一处
     * */
}

/**
 * 存取器
 * 首先，存取器要求你将编译器设置为输出ECMAScript 5或更高。不支持降级到ECMAScript 3。 
 * 其次，只带有 get不带有 set的存取器自动被推断为 readonly。 
 * 这在从代码生成 .d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。
 * */
{
    let passcode = "secret passocde";
    class Employee {
        private _fullName: string;
        get fullName(): string {
            return this._fullName;
        };
        set fullName(newName: string) {
            if (passcode && passcode === "secret passcode") {
                this._fullName = newName;
            } else {
                throw new Error("Unauthorized update of employee");
            }
        }
    }
    let employee = new Employee();
    employee.fullName = "Bob Smith";
    if (employee.fullName) {
        alert(employee.fullName);
    }
}

/**
 * 静态属性
 * */
{
    class Grid {
        static origin = { x: 0, y: 0 };// 静态属性
        calculateDistanceFromOrigin(point: { x: number, y: number }) {
            let xDist = (point.x - Grid.origin.x);
            let yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
        constructor(public scale: number) {}
    }
    let grid1 = new Grid(1.0);  // 1x scale
    let grid2 = new Grid(5.0);  // 5x scale
    console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
    console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
}

/**
 * 抽象类
 * */
{
    abstract class Animal {
        constructor(protected name: string) {}
        abstract makeSound(): void; // 必须在派生类中实现
        move(): void {
            console.log("roaming the earch...");
        }
    }

    class Dog extends Animal {
        constructor() {
            super("Dog");
        }
        makeSound(): void {
            console.log("Woof!Woof!")
        }

        eat(): void {
            console.log("Eat food");
        }
    }

    let dog = new Dog();
    let dog2: Animal = new Dog();
    //let animal = new Animal("");    //错误，无法创建抽象类的实例
    //dog2.eat(); // 错误，方法在Animal中不存在
}