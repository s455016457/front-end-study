(function($) {
    $.fn.CircularProgressBar = function(options, param) {
        if (typeof options === "string") {
            var method = $.fn.CircularProgressBar.methods[options];
            if (method)
                return method(this, param);
            else
                throw "未知方法" + options;
        }

        options = $.extend({}, $.fn.CircularProgressBar.default, options || {});
        console.log(options);
        $.data(this, { options: options });
        Create(this, options);
        return this;
    }

    function Create(jq, options) {
        var status = $.data(jq);
        var options = status.options;
        if (options.r) {
            console.log((options.r + options.strokeWidth) * 2);
            jq.attr("width", (options.r + options.strokeWidth) * 2);
            jq.attr("height", (options.r + options.strokeWidth) * 2);
        } else {
            var w = jq.attr("width");
            var h = jq.attr("height");
            var r = (w > h ? h : w) / 2 - options.strokeWidth;
            if (r > 0)
                options.r = r;
        }

        console.log(options);
        status.path = $(document.createElementNS("http://www.w3.org/2000/svg", "path"))
            .attr("fill", "none");
        status.text = $('<text x="50%" y="50%" text-anchor="middle"></text>');
        status.path.appendTo(jq);
        status.text.appendTo(jq);
        Render(status);
    }

    function Render(status) {
        var options = status.options;
        var progress = options.value;
        status.path.attr("stroke", options.color);

        //将path平移到我们需要的坐标位置
        status.path.attr('transform', 'translate(' + (options.r + options.strokeWidth) +
            ',' + (options.r + options.strokeWidth) + ')');
        // 计算当前的进度对应的角度值
        var degrees = progress * 360;

        // 计算当前角度对应的弧度值
        var rad = degrees * (Math.PI / 180);

        //极坐标转换成直角坐标 Math.sin方法和Math.cos方法传入的是弧度值
        //Math.sin(x) x	必需。一个以弧度表示的角。将角度乘以 0.017453293 （2PI/360）即可转换为弧度。
        var x = (Math.sin(rad) * options.r).toFixed(2);
        var y = -(Math.cos(rad) * options.r).toFixed(2);
        var lenghty = window.Number(degrees > 180);
        //path 属性
        var descriptions = ['m', 0, -options.r, 'a', options.r, options.r, 0, lenghty, 1, x, y];
        console.log(descriptions);
        // 给path 设置属性
        status.path.attr('d', descriptions.join(' '));
        status.path.attr('stroke-width', options.strokeWidth);

        status.text.text(progress * 100 + "%");
        status.text.attr("font-size", options.titleFontSize);
        // var tw = status.text.outerWidth();
        // var th = status.text.outerHeight();
        // console.log(tw);
        // console.log(th);
        // status.text.attr("x", options.r + options.strokeWidth - tw / 2);
        // status.text.attr("y", options.r + options.strokeWidth + th / 2);
    }

    $.fn.CircularProgressBar.methods = {
        options: function(jq) {
            return $.data(jq).options;
        },
        getValue: function(jq) {
            return $.data(jq).options.value;
        },
        setValue: function(jq, value) {

        },
        setR: function(jq, value) {},
        getR: function(jq) {
            return $.data(jq).options.r;
        },
        render: function(jq) {
            Render($.data(jq));
        }
    };

    $.fn.CircularProgressBar.default = {
        // r: 120,
        color: "#fd30ae",
        value: 0.6,
        strokeWidth: 10,
        titleFontSize: 24,
    };

})(jQuery);