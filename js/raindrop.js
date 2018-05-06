var bucket;
var background;
var raindrops = [];
var touch = false;
var myScore;
var collected = 0;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var gravity = 0.05;
var timer;

 //cursor
 window.addEventListener("mousemove", mouseMove, false);
             
 function mouseMove(e) {
        gameArea.x = e.pageX;
        console.log("no");
    
}
// mobile touch
window.addEventListener('touchstart', touchStart, false);
window.addEventListener('touchmove', touchMove, false)
window.addEventListener('touchend', touchEnd, false);

function touchStart(e) {
    console.log("touched");
    touch = true;
}

function touchMove(e) {
    if (touch === true && e.touches[0].screenX < gameArea.canvas.width) {
        var touchLocation = e.targetTouches[0];
        gameArea.x = touchLocation.pageX;
        console.log("what");
    }
}

function touchEnd(e) {
    console.log("touchend");
    touch = false;
}


function startRaindropGame() {
    gameArea.start();
    bucket = new componentImg(width*0.1, width*0.1,
        gameArea.canvas.width/2 - width*0.1, gameArea.canvas.height- height*0.1, "../images/bucket.png");
    myScore = new componentText(height*0.05 + "px", "Consolas", "black", 0, height*0.05, "text");
    timer = new componentText(height*0.05 + "px", "Consolas", "black", width*0.8, height*0.05, "text");
    }

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        gameArea.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height * 0.7;
        // Adds context
        this.context = this.canvas.getContext("2d");
        let div1 = document.getElementById("raindropGame");
        let div2 = document.getElementById("raindropDIV");
        div1.appendChild(this.canvas);
        div2.style.display = "block";
        this.interval = setInterval(updateGameArea, 20);
        this.canvas.style.cursor = "none";
        this.frameNum = 0;
    },
    clear : function () {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('touchstart', touchStart);
        window.removeEventListener('touchmove', touchMove)
        window.removeEventListener('touchend', touchEnd);
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
    this.gravitySpeed = 0;
    this.update = function() {
        obj1 = gameArea.context;
        obj1 = new Image(this.width,this.height);
        obj1.src = src;
        gameArea.context.drawImage(obj1,this.x,this.y, this.width, this.height);
        
    } 
    this.collideWith = function(otherobj) {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let collide = true;
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
    width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    gameArea.canvas.width = width;
    gameArea.canvas.height = height * 0.69;
    bucket.y = gameArea.canvas.height- bucket.height;
    bucket.width = width*0.1;
    bucket.height = width*0.1;
    var x, y;
    for (let i = 0; i < raindrops.length; i++) {
        if (bucket.collideWith(raindrops[i])) {
            collected += 5;
            raindrops.splice(i, 1);
            console.log(raindrops.length)
            if (collected === 100) {
                gameArea.stop();
            }
        } 
    }
    gameArea.clear();
    gameArea.frameNum += 1;
    // Update background first

    
    
    if (gameArea.frameNum === 1 || everyinterval(30)) {
        x = Math.floor(Math.random()*(gameArea.canvas.width));
        y = 1;
        raindrops.push(new componentImg(width*0.05, width*0.05, x, y, "../images/raindrop.png"));
    }
    for (let i = 0; i < raindrops.length; i++) {
        raindrops[i].gravitySpeed += gravity;
        raindrops[i].y += 1 + raindrops[i].gravitySpeed;
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
        myScore.fontSize = width*0.03 + "px";
        timer.fontSize = width*0.03 + "px";
        myScore.text = "Collected: " + collected + "%";
        timer.text = "Time: " + (20 - Math.ceil(gameArea.frameNum/50))
        timer.x = width*0.8;
        if((20 - Math.ceil(gameArea.frameNum/50) == 0)) {
            gameArea.stop();
        }
        timer.update();
        myScore.update();
        bucket.update();
}

function everyinterval(n) {
    if ((gameArea.frameNum / n) % 1 == 0) {return true;}
    return false;
}

/* Button Functionality. */

function initializeRaindropButtons() {
    var nextButton = document.getElementById("next");
    console.log(nextButton);
    
    nextButton.addEventListener("click", nextClick, false);

/*     function nextClick() {
        pageOpen = true;
        var removeCanvas = document.getElementsByTagName("canvas");
        var div1 = document.getElementById("raindropGame");
        removeCanvas[0].remove(document.body);
        startRaindropGame();
    } */

    function nextClick() {
        console.log((Math.ceil(gameArea.frameNum / 50) ));
        if (collected == 100) {
            blackout();
            window.location.href = "./transitionPage2.html";
        } else if ((Math.ceil(gameArea.frameNum / 50) == 20)){
            blackout();
            window.location.href = "./transitionPage2.html";
        } else {
            console.log("Game not completed.");
        }
        
    }

/*     var removeButton = document.getElementById("remove");
    console.log(removeButton);
    
    removeButton.addEventListener("click", removeClick, false); */

    function removeClick() {
        gameArea.stop();
        gameArea.clear();
        collected = 0;
        let div2 = document.getElementById("raindropDIV");
        div2.style.display = "none";
        var removeCanvas = document.getElementsByTagName("canvas");
        var div1 = document.getElementById("raindropGame");
        removeCanvas[0].remove(div1);
    }
    

    function blackout(){
         $('#overlay').animate({
           opacity: 1,
         }, 1500, function() {

         });
        setTimeout(1500);
        }

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