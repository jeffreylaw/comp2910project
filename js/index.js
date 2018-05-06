var title;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var start;
var startButton;
var character2;

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
        div1.appendChild(this.canvas);
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
