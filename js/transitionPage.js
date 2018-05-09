var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var textbox;
var start;
var next;
var name;
var textNum = 1;

function startScreen() {
    screenArea.start();
}

var screenArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        var div1 = document.getElementById("divID");
        div1.prepend(this.canvas);
        this.interval = setInterval(updateScreenArea, 20);
        this.frameNum = 0;

    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function componentImg(width, height, x, y, src) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.update = function () {
        obj1 = screenArea.context;
        obj1 = new Image(this.width, this.height);
        obj1.src = src;
        screenArea.context.drawImage(obj1, this.x, this.y, this.width, this.height);

    }

}

function componentText(fontSize, fontType, color, x, y, text) {
    this.fontSize = fontSize;
    this.fontType = fontType;
    this.x = x;
    this.y = y;
    this.update = function () {
        obj1 = screenArea.context;
        obj1.font = this.fontSize + " " + this.fontType;
        obj1.fillStyle = color;
        obj1.fillText(this.text, this.x, this.y);
    }

}


function updateScreenArea() {
    var x, y;
    width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    screenArea.canvas.width = width;
    screenArea.canvas.height = height;

    screenArea.clear();
    screenArea.frameNum += 1;
}

function everyinterval(n) {
    if ((screenArea.frameNum / n) % 1 == 0) { return true; }
    return false;
}

$(document).ready(function () {
    $('#overlay').animate({
        opacity: 1,
    }, 0, function () {
    });
    $('#overlay').animate({
        opacity: 0,
    }, 1500, function () {
    });

    $("#earthguy").hide(0);
    $("#next").click(function () {
        textNum++;
        console.log(textNum);
        switch (textNum) {
            case 2:
                $("#text1").html("With a population of _______, the citizens of Vancouver are struggling to find water to use for their daily activities.");
                break;
            case 3:
                $("#text1").html("As part of your duties as mayor, you are faced with the task of solving the water crisis in Vancouver.");
                break;
            case 4:
                $("#text1").html("First, name your self please.");
                name = prompt("Please Enter the Name", "Enter Name Here");
                document.getElementById("divID").style.backgroundImage = 'url("../images/testBack.jpeg")';
                animateDiv();
                $("#text1").html("Hello " + name + ", welcome to Vancouver. We have been expecting you.");
                break;
            case 5:
                $("#text1").html("Although we receive a lot of rain in Metro Vancouver, climate change has caused snowpacks to melt earlier in the spring.");
                break;
            case 6:
                $("#text1").html("As a result, there is a low supply of water during dry summers. With our population growing by over 35,000 each year, we need to find ways to lower water use.");
                break;
            case 7:
                $("#text1").html("Please speak to the citizens of Vancouver and help them conserve water. That way we ensure that everyone can continue to have access to clean water.");
                break;
            case 8:
                $("#text1").html("For now, we will let you get some rest. Tomorrow we will visit the source of Metro Vancouver’s water.");
                break;

            case 9:
                document.getElementById("divID").style.backgroundImage = 'url("../images/testBack2.jpeg")';
                animateDiv();
                $("#text1").html("");
                break;

            case 10:
                    $('#overlay').animate({
                        opacity: 1,
                    }, 1500, function () {
                    });
                    setTimeout(nextPage, 1500);
                break;
            default:
                break;
        }

    });

})

function animateDiv() {
    $('#divID').animate({
        opacity: 0,
    }, 0, function () {
    });
    $('#divID').animate({
        opacity: 1,
    }, 1000, function () {
    });
}

function nextPage() {
    window.location.href = "./raindrop.html";
}

function updatePage() {
    var text = document.getElementsByTagName("p");
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

    for (let i = 0; i < text.length; i++) {
        if (width > height) {
            text[i].style.fontSize = height * 0.04 + "px";
        } else {
            text[i].style.fontSize = width * 0.04 + "px";
        }
    }
    setTimeout(updatePage, 100);
}
updatePage();