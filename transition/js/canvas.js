var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var textbox;
var start;
var next;
var char1;

function startScreen() {
    screenArea.start();
    char1 = new componentImg(width*0.1, width*0.1,
        screenArea.canvas.width/2 - width*0.1, screenArea.canvas.height- height*0.1, "./image/earthchan.png");
}

var screenArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.setAttribute("id","storyPage1");
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
    char1.x = screenArea.canvas.width * 0.4;
    char1.y = screenArea.canvas.height- char1.height;
    char1.width = height*0.7;
    char1.height = height*0.7;
    if(char1.height > screenArea.canvas.height*0.9){
        char1.height =  screenArea.canvas.height*0.9;
    }
    
    
    screenArea.clear();
    screenArea.frameNum += 1;
    char1.update();
}

function everyinterval(n) {
    if ((screenArea.frameNum / n) % 1 == 0) {return true;}
    return false;
}

var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);


$(document).ready(function(){
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
    $("#earthchan").hide(0);
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
        document.getElementById("divID").style.backgroundImage = 'url("./image/testBack.jpeg")';        
        $('#divID').animate({
        opacity: 0,
        }, 0, function() {
        });
        $('#divID').animate({
        opacity: 1,
        }, 1000, function() {
        });
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
        $('#overlay').animate({
            opacity: 1,
        }, 1500, function() {
        });
        
        setTimeout(removeElements, 1500);
        
    })
})

function removeElements() {
    window.location.href = "../minigame1/html/raindrop.html";
}
