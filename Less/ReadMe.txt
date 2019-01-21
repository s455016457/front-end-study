Less是一门CSS预处理语言，它扩展了CSS语言，增加了变量，Mixin，函数等特性，使CSS更易维护和扩展。

中文网地址：http://lesscss.cn/

例子：
@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
  -webkit-box-shadow: @style @c;
  box-shadow:         @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
  .box-shadow(@style, rgba(0, 0, 0, @alpha));
}
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
  div { .box-shadow(0 0 5px, 30%) }
}

输出：
.box {
  color: #fe33ac;
  border-color: #fdcdea;
}
.box div {
  -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

使用方法
可以通过npm在命令行上使用Less，作为浏览器的脚本文件下载或在各种第三方工具中使用。有关更多详细信息，请参阅“ 用法”部分

安装
在服务器上安装Less的最简单方法是通过npm，node.js包管理器，如下所示：

$ npm install -g less
命令行用法
安装后，您可以从命令行调用编译器，如下所示：

$ lessc styles.less
这将输出编译的CSS stdout。要将CSS结果保存到您选择的文件，请使用：

$ lessc styles.less styles.css
要输出缩小，您可以使用CSS clean-css插件。安装插件后，使用--clean-css选项指定缩小的CSS输出：

$ lessc --clean-css styles.less styles.min.css