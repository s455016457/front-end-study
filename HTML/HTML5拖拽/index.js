(function() {
    var drag = document.querySelector(".drag");
    var boxs = document.querySelectorAll(".box");

    // 定义drag事件
    drag.addEventListener("dragstart", dragStart);
    drag.addEventListener("dragend", dragEnd);

    for (const element of boxs) {
        element.addEventListener("dragenter", dragEnter);
        element.addEventListener("dragleave", dragLeave);
        element.addEventListener("dragover", dragOver);
        element.addEventListener("drop", dragDrop);
    }

    /**
     * 元素拖动开始
     * @param {*} e 
     */
    function dragStart(e) {
        // console.log("ondragstart");
        this.className += " drag-hold";
        // 将元素隐藏，必须在其他方法中执行
        setTimeout(() => {
            this.className = "invisible";
        }, 0);
    }

    /**
     * 元素拖动结束
     * @param {*} e 
     */
    function dragEnd(e) {
        // console.log("ondragend");
        this.className = "drag";
    }

    /**
     * 元素进入可拖动范围
     */
    function dragEnter() {
        //  console.log("enter");
        this.className += " box-drag-enter";
    }

    /**
     * 元素离开可拖动范围
     */
    function dragLeave(e) {
        //  console.log("dragLeave");
        this.className = "box";
    }

    /**
     * 元素在有效拖放目标上正在被拖动时
     * @param {*} e 
     */
    function dragOver(e) {
        e.preventDefault();
        // console.log("dragOver");
    }

    /**
     * 当被拖元素正在被拖放时
     * @param {事件对象} e 
     */
    function dragDrop(e) {
        e.preventDefault();
        // 将元素放入目标元素中
        this.append(drag);
        this.className = "box";
        // console.log("drag");
    }
})();