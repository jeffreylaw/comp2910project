var bucket;
var background;
var raindrops = [];
var touch = false;
var myScore;
var collected = 0;

function startGame() {
    gameArea.start();
    bucket = new componentImg(32, 32,
        gameArea.canvas.width/2 - 15, gameArea.canvas.height- 32, "bucket.png");
    myScore = new componentText("20px", "Consolas", "black", 0, 20, "text");
    }

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 250;
        this.canvas.height = 250;
        // Adds context
        this.context = this.canvas.getContext("2d");
        var div1 = document.getElementById("divID");
        div1.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.style.cursor = "none";
        this.frameNum = 0;
        
         //cursor
         window.addEventListener("mousemove", function (e) {
            if(e.pageX < gameArea.canvas.width - bucket.width/2
            && e.pageX > bucket.width/2) {
                gameArea.x = e.pageX;
                //console.log("no");
            }
            
        })
        // mobile touch
        window.addEventListener('touchstart', touchStart, false);
        window.addEventListener('touchmove', touchMove, false)
        window.addEventListener('touchend', touchEnd, false);

        function touchStart(e) {
            console.log("touched");
            touch = true;
        }

        function touchMove(e) {
            if (touch == true && e.touches[0].screenX < gameArea.canvas.width) {
                var touchLocation = e.targetTouches[0];
                gameArea.x = touchLocation.pageX;
                console.log("what");
            }
        }

        function touchEnd(e) {
            console.log("touchend");
            touch = false;
        }

        
    },
    clear : function () {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function componentText(fontSize, fontType, color, x, y, text) {
    this.fontSize = fontSize;
    this.fontType = fontType;
    this.x = x;
    this.y = y;   
    this.update = function() {
        obj1 = gameArea.context;
        obj1.font = this.fontSize + " " + this.fontType;
        obj1.fillStyle = color;
        obj1.fillText(this.text, this.x, this.y);
    } 

}

function componentImg(width, height, x, y, src) {
    this.x = x;
    this.y = y;   
    this.width = width;
    this.height = height;
    this.update = function() {
        obj1 = gameArea.context;
        obj1 = new Image(this.width,this.height);
        obj1.src = src;
        gameArea.context.drawImage(obj1,this.x,this.y);
        
    } 
    this.collideWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var collide = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           collide = false;
        }
        return collide;
    }

}

function updateGameArea() {
    
    var x, y;
    for (i = 0; i < raindrops.length; i += 1) {
        if (bucket.collideWith(raindrops[i])) {
            collected += 5;
            raindrops.splice(i, 1);
            console.log(raindrops.length)
        } 
    }
    gameArea.clear();
    gameArea.frameNum += 1;
    // Update background first

    
    
    if (gameArea.frameNum == 1 || everyinterval(50)) {
        x = Math.floor(Math.random()*(gameArea.canvas.width));
        y = 1;
        raindrops.push(new componentImg(10, 10, x, y, "raindrop.png"));
    }
    for (i = 0; i < raindrops.length; i += 1) {
        raindrops[i].y += 1*(i+1);
        if (raindrops[i].y > gameArea.canvas.height) {
            raindrops.splice(i, 1);
        }
        raindrops[i].update();
    }

        // cursor
        if(gameArea.x) {
            bucket.x = gameArea.x - bucket.width/2;
        }
        //touch
        if (gameArea.touchX) {
            bucket.x = gameArea.x - bucket.width/2;
        }

        myScore.text = "Collected: " + collected + " %";
        myScore.update();
        bucket.update();
}

function everyinterval(n) {
    if ((gameArea.frameNum / n) % 1 == 0) {return true;}
    return false;
}

