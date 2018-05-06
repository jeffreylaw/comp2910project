var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var textbox;
var start;
var next;
var name;

function startScreen() {
    screenArea.start();
}

var screenArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        var div1 = document.getElementById("divID");
        div1.prepend(this.canvas);
        this.interval = setInterval(updateScreenArea, 20);
        this.frameNum = 0;
        
    },
    clear : function () {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function componentImg(width, height, x, y, src) {
    this.x = x;
    this.y = y;   
    this.width = width;
    this.height = height;
    this.update = function() {
        obj1 = screenArea.context;
        obj1 = new Image(this.width,this.height);
        obj1.src = src;
        screenArea.context.drawImage(obj1,this.x,this.y, this.width, this.height);
        
    } 

}

function componentText(fontSize, fontType, color, x, y, text) {
    this.fontSize = fontSize;
    this.fontType = fontType;
    this.x = x;
    this.y = y;   
    this.update = function() {
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
    if ((screenArea.frameNum / n) % 1 == 0) {return true;}
    return false;
}

$(document).ready(function(){
    document.getElementById("divID").style.backgroundImage = 'url("./images/testBack2.jpeg")';
    $('#overlay').animate({
       opacity: 1,
     }, 0, function() {
    });
        $('#overlay').animate({
       opacity: 0,
     }, 1500, function() {
    });
    
    $("#text2").hide(0);
    $("#text3").hide(0);
    $("#text4").hide(0);
    $("#text5").hide(0);
    $("#text6").hide(0);
    $("#text7").hide(0);
    $("#text8").hide(0);
    $("#text9").hide(0);
    $("#text10").hide(0);
    $("#earthguy").hide(0);
    $("#next").click(function(){
        $("#text1").hide(0);
        $("#next").hide(0);
        $("#text2").show(0);
    })
    $("#next2").click(function(){
        $("#text2").hide(0);
        $("#next2").hide(0);
        $("#text3").show(0);
    })
    $("#next3").click(function(){
        $("#text3").hide(0);
        $("#next3").hide(0);
        $("#text4").show(0);
    })
    $("#next4").click(function(){
        $("#text4").hide(0);
        $("#next4").hide(0);
        $("#text5").show(0);
    })
    $("#next5").click(function(){
        $("#text5").hide(0);
        $("#next5").hide(0);
        $("#text6").show(0);
    })
    $("#next6").click(function(){
        $("#text6").hide(0);
        $("#next6").hide(0);
        $("#text7").show(0);
    })
    $("#next7").click(function(){
        $("#text7").hide(0);
        $("#next7").hide(0);
        $("#text8").show(0);
    })
    $("#next8").click(function(){
        $("#text8").hide(0);
        $("#next8").hide(0);
        $("#text9").show(0);
    })
    $("#next9").click(function(){
        $("#text9").hide(0);
        $("#next9").hide(0);
        $("#text10").show(0);
    })
    $("#next10").click(function(){
        $('#overlay').animate({
            opacity: 1,
        }, 1500, function() {
        });
        
        setTimeout(removeElements, 1500);
        
    })
})

function removeElements() {
    window.location.href = "./raindrop.html";
}

function updateText() {
    var text = document.getElementsByTagName("p");
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

    for(let i = 0; i < text.length; i++) {
        if( width > height) {
            text[i].style.fontSize = height * 0.04 + "px";
        } else {
            text[i].style.fontSize = width * 0.04 + "px";
        }
    }
    setTimeout(updateText, 100);
}
updateText();