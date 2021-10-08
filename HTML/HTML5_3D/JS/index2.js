(function() {
    var images = [
        "Images/1.jpg", "Images/2.jpg", "Images/3.jpg", "Images/4.jpg", "Images/5.jpg", "Images/6.jpg", "Images/7.jpg", "Images/8.jpg", "Images/9.jpg", "Images/10.jpg"
    ];


    function init() {
        var panels = document.querySelectorAll(".panel");
        for (let i = 0; i < panels.length; i++) {

            panels[i].className = "panel" + (i + 1);
        }
    }
    init();
    // var imageRootPtah = "";


    // function imagePreLoaded() {
    //     let div = document.createElement("div");

    //     div.style.display = "none";
    //     document.body.appendChild(div);

    //     for (let i = 0; i < images.length; i++) {
    //         let img = document.createElement("img");
    //         img.src = images[i];
    //         div.appendChild(img);
    //     }
    // }

    // imagePreLoaded();

    function imageChange() {
        console.log("开始更改图片");
        var panels = document.querySelectorAll(".panel");
        for (let i = 0; i < panels.length; i++) {
            if (Math.random(1) < .8) {
                continue;
            }
            let index = parseInt(Math.random() * images.length * 2);

            while (index >= images.length) {
                index = parseInt(Math.random() * images.length * 2);
            }
            console.log("panle " + i + "  更改图片 " + index);
            panels[i].style.backgroundImage = 'url("' +
                imageRootPtah + images[index] + '")';
        }

    }

    // setInterval(imageChange, 8000);

    setInterval(() => {
        if (Math.random(1) < .3) {
            return;
        }
        let index = parseInt(Math.random() * 20);

        while (index >= images.length) {
            index = parseInt(Math.random() * 20);
        }
        document.querySelector(".main").style.backgroundImage = 'url("' +
            imageRootPtah + images[index] + '")';
    }, 16000);

    var rotateX = -35,
        rotateY = 25,
        rotateZ = 25;

    function BoxRotate() {
        var box = document.querySelector(".box");

        rotateX += 0.2;
        rotateY += 0.2;
        rotateZ += 0.2;

        var strTransform = "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) rotateZ(" + rotateZ + "deg) translate3d(59px, 70px, 130px)"

        box.style.transform = strTransform;
    }

    setInterval(BoxRotate, 30);
})(window);