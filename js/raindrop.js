var bucket;
var raindrops = [];


function startGame() {
    gameArea.start();
    bucket = new component(30, 30, "black", 
        gameArea.canvas.width/2 - 15, gameArea.canvas.height - 30);
}

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 250;
        this.canvas.height = 250;
        this.context = this.canvas.getContext("2d");
        var div1 = document.getElementById("divID");
        div1.appendChild(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.style.cursor = "none";
        this.frameNum = 0;

        //cursor
        window.addEventListener("mousemove", function (e) {
            if(e.pageX < 225) {
                gameArea.x = e.pageX;
                //console.log("no");
            }
            
        })
        // mobile touch  
        window.addEventListener('touchmove', function (e) {
            if (e.touches[0].screenX < 225) {
                var touchLocation = e.targetTouches[0];
                gameArea.x = touchLocation.pageX;
                //console.log("what");
            }
        })
    },
    clear : function () {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;   
    this.update = function() {
        obj1 = gameArea.context;
        obj1.fillStyle = color;
        obj1.fillRect(this.x, this.y, this.width, this.height);
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
            gameArea.stop();
            console.log(raindrops.length)
            return;
        } 
    }
    gameArea.clear();
    gameArea.frameNum += 1;
    if (gameArea.frameNum == 1 || everyinterval(50)) {
        x = Math.floor(Math.random()*(gameArea.canvas.width));
        y = 1;
        raindrops.push(new component(10, 10, "blue", x, y));
    }
    for (i = 0; i < raindrops.length; i += 1) {
        raindrops[i].y += 1.5;
        if (raindrops[i].y > gameArea.canvas.height) {
            raindrops.splice(i, 1);
        }
        raindrops[i].update();
    }

        // cursor
        if(gameArea.x) {
            bucket.x = gameArea.x - 2;
        }
        //touch
        if (gameArea.touchX) {
            bucket.x = gameArea.x -15;
        }

        bucket.update();
    
}

function everyinterval(n) {
    if ((gameArea.frameNum / n) % 1 == 0) {return true;}
    return false;
}

