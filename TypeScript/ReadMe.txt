1、什么是Typescript？
TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。截止目前，Typescript已经发布了最新的3.1版本。Typescript中文网;下图为Typescript与ES6、ES5的关系。Typescript包含了ES6与ES5,简而言之，我们可以在Typescript写ES6与ES5的语法。

2、为什么要去用Typescript？
<1>、TypeScript的设计目的应该是解决JavaScript的“痛点”：弱类型和没有命名空间，导致很难模块化，不适合开发大型程序。另外它还提供了一些语法糖来帮助大家更方便地实践面向对象的编程。
<2>、Typescript越来越在前端流行与广泛使用，在最新的TIOBE的编程语言排行榜中，成为最大的黑马，从第167名上升至49名，所以对于想要做好web的我们，了解并熟练掌握Typescript变得极为重要。

中文网地址：https://www.tslang.cn/docs/home.html

命令安装: npm install -g typescript
命令编译： tsc test.ts

配置配置文件
我们如果要将一个Typescript文件（.ts文件）编译成一个js文件，那么每次都要去运行tsc命令是不是很烦呢，那如果要编译整个项目呢？有没有那种我们边写ts边生成js的方法呢？答案肯定是有的。接下来我们去配置配置文件。
我们去运行tsc --init命令，在项目的根目录生成tsconfig.json的配置文件

如果一个目录下存在一个tsconfig.json文件，那么它意味着这个目录是TypeScript项目的根目录。 tsconfig.json文件中指定了用来编译这个项目的根文件和编译选项。 一个项目可以通过以下方式之一来编译：
不带任何输入文件的情况下调用tsc，编译器会从当前目录开始去查找tsconfig.json文件，逐级向上搜索父目录。
不带任何输入文件的情况下调用tsc，且使用命令行参数--project（或-p）指定一个包含tsconfig.json文件的目录。
当命令行上指定了输入文件时，tsconfig.json文件会被忽略。

{
    "compilerOptions": {
        "module": "amd",
        "noImplicitAny": true,
        "removeComments": true,			// true 删除注释
        "preserveConstEnums": true,
		"outFile": "main.js",
        "sourceMap": true				// true 生成map文件
    },
    "files": [	// 文件列表
        "test.ts",
        "test2.ts",
    ],
	"include": [	//包含文件夹下所有文件
        "src/**/*"
    ],
    "exclude": [	// 排除那些文件
        "node_modules",
        "**/*.spec.ts"
    ]
}