# JQuery积累

## 选择符

``` JavaScript
$('a[@title]')  // 选择带有title属性的a标签
$('div[ol]')    // 选择包含有一个ol元素的div元素  方括号左边是选择的目标对象，方括号右边是筛选标准
```

属性选择符运行以类似正则表达式的语法来标示字符串的开始（`^`）和结尾(`$`)。而且可以用星号（`*`）标示字符串中的任意位置。

``` JavaScript
$('a[@href^="mailto:"]')    // 获取所有电子邮件链接
$('a[@href$=".PDF"]')       // 获取所有指向PDF文件的链接
$('a[@href*="mysite.com"]') // 获取所有指向mysite.com网站的链接
```

### 自定义选择符

自定义选择符的语法与CSS中的伪类选择符语法相同，即选择符以一个冒号（`:`）开头。

``` JavaScript
$('div.horizontal:eq(1)')       // 获取horizontal类div集合的第二个元素，编号从0开始，而Css则是从1开始的
$("tr:odd")                     // 获取奇数行tr标签  与eq选择符一样，odd和even选择符从0开始编号
$("tr:even")                    // 获取偶数行tr标签
$("span:contains('search')")    // 获取所有正文包含 search 的span标签
```

### DOM遍历方法

```JavaScript
$("tr:odd")
$("tr").filter("odd")
```

```JavaScript
$('td:contains("Henry")').siblings();   // 获取包含Henry单元格的所有同辈元素
```

上面两种方法的效果是一样的

```JavaScript
$('td:contains("Henry")')       // 获取包含"Henry"的所有单元格
    .parent()                   // 获取他的父元素
    .find('td:eq(1)')           // 在父元素中查找第二个单元格
    .addClass('highlight')      // 为该单元格添加"highlight"类
    .end()                      // 恢复到包含"Henry"的单元格的父类
    .find('td:eq(2)')           // 在父元素中查找第3个单元格
    .addClass('highlight');     // 为该单元格添加"highlight"类
```

## 事件

```JavaScript
$('a').click(function(event){
    if(event.target === this){  // 触发事件的是当前元素
        // 事件操作
    }
});

$('a').click(function(event){
    event.stopPropagation();// 停止事件冒泡  事件传播
});

$('form').submit(function(event){
    event.preventDefault();// 停止事件默认行为
});

// 事件传播和默认操作是相互独立的两套机制，在二者任何一方发生时，都可以终止另一方。如果要同事停止事件传播和默认操作，可以在事件处理程序中返回false。
$('a').click(function(event){
    $('a button').toggleClass('hidden');    // 如果存在hidden类则删除，否则就添加该css类
    return false;
});

$('a').toogle(function(){},function(){});//用于绑定两个或多个事件处理器函数，以响应被选元素的轮流的 click 事件。第一次点击执行第一个参数，第二次点击执行第二个参数，依次类推
```

移除事件

```JavaScript
    function eventHandler(event){
        // 事件操作
    }

    $('a').bind("click",eventHandler);      // 绑定Click事件
    $('a').bind("click",eventHandler);      // 绑定Click事件，对于方法名相同的函数，bind只会绑定一次
    $('a').bind("click",function(){});      // 绑定Click事件
    $('a').unbind("click",eventHandler);    // 移除click事件的eventHandler处理程序
    $('a').unbind("click");                 // 移除click事件绑定的所有处理程序

    $('a').one("click",eventHandler));      //绑定的事件只触发一次
```

触发事件

```JavaScript
$('a').trigger('click');        // 触发a标签绑定的click事件，这种方式不会发生事件传播
$('a').click();                 // 与上面方法效果相同
```
