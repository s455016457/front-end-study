# 利用Knockout自定义绑定功能实现对jquery-easyUI combo组件的绑定支持

在项目中遇到同时使用Knockout和jquery-easyUI时，Knockout无法正常绑定jquery-easyUI的combo组件。通过Knockout自定义绑定和jquery-easyUI的扩展功能解决该问题。

## [Knockout自定义绑定](https://knockoutjs.com/documentation/custom-bindings.html)

Knockout 自定义绑定注册提供两个回调参数：`init`、`update`.

### `init`回调

Knickout在每个DOM元素绑定时调用一次`init`函数。有两个主要用途init：

* 为DOM元素设置初始状态
* 注册事件处理程序

> Knockout会通过完全相同的一组参数，它传递给了update回调。

### `update`回调

当绑定应用到元素并跟踪你访问的任何依赖项(可观察/可计算)时，Knockout将首先调用`update`回调。当任何依赖被更改时，`update`回调将会再一次被调用。下面是传入的参数：

* element：绑定的DOM元素
* valueAccessor：一个JavaScript函数，可以调用该函数以获取此绑定中涉及的当前模型属性。在不传递任何参数的情况下调用此函数（即，调用valueAccessor()）以获取当前模型属性值。要轻松接受可观察值和纯值，请调用ko.unwrap返回的值。
* allBindings：一个JavaScript对象，可用于访问绑定到此DOM元素的所有模型值。调用allBindings.get('name')以检索name绑定的值（undefined如果绑定不存在则返回）；或allBindings.has('name')确定name当前元素是否存在绑定。
* viewModel：在Knockout 3.x中不推荐使用此参数。使用bindingContext.$data或bindingContext.$rawData访问视图模型。
* bindingContext：一个对象，其中包含可用于此元素绑定的绑定上下文。这个对象包括特殊的性质，包括$parent，$parents，和$root，可用于对已进行这方面的祖先绑定访问数据。

## 实现

最初的想法是在`init`回调函数中监听combo的onChange事件，但是这种方法行不通，因为在Knockout绑定时，combo组件可能还没有初始化。

所以只能监听Knockout绑定的DOM元素，而combo的值在更改时并没有修改原来DOM元素的值（也就是说Knockout绑定的DOM元素），所以需要扩展combo，在onChange事件触发时同时修改原来DOM元素的值，并触发该元素的onChange事件。

### Knockout自定义绑定

```javascript
ko.bindingHandlers.jquery-easyui_combo = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // 当绑定第一次应用到一个元素时，将调用它
            // 在这里设置任何初始状态、事件处理程序等
            var value = valueAccessor();

            /***
             * jquery-easyui 重新渲染，导致这里绑定的事件丢失
             * 在jquery-easyUI中通过将值赋予源DOM解决了该问题
             * **/
            //if ($(element).data("combo")) {
            //    var input = $(element).combo("textbox");
            //    input.unbind(".ko_custom")
            //        .bind("change.ko_custom", function () {
            //            console.log(this);
            //            value($(this).val());
            //        });
            //}

            // 捕获jquery-easyUI中触发的onchange事件
            $(element).unbind(".ko_custom")
                .bind("change.ko_custom", function () {
                    console.debug(" element.onChange ", event, this, this.value);
                    value(this.value);
                });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            // 当绑定第一次应用到一个元素时，它将被调用一次，
            //当访问的可观察/计算值发生变化时，这里将再次调用
            //根据这里提供的值更新DOM元素。
            var newValue = ko.unwrap(valueAccessor());
            var oldValue = $(element).combo('getValue');
            if (newValue !== oldValue) {
                if ($(element).data("combobox"))
                    $(element).combobox('setValue', newValue);
                else if ($(element).data("combo")) {
                    $(element).combo('setValue', newValue);
                    $(element).combo('setText', newValue);
                }
            }
        }
    };
```

### combo扩展

``` javascript

(function ($) {
    var oldOnChange = $.fn.combo.defaults.oldOnChange;
    $.extend($.fn.combo.defaults, {
        //  解决 Ko 绑定问题
        // 主动触发源DOM的onchange事件，已方便Ko自定义绑定中捕获
        onChange: function (newValue, oldValue) {
            if (oldOnChange) oldOnChange.call(this, width, height);
            if (newValue !== oldValue) {
                $(this).val(newValue);
                $(this).change();
            }
        }
    });
})(jQuery);
```

> 该方法还可以用于jquery-easyUI的TextBox、SwitchButton等组件。
