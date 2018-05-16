var objects = [];
var touch = false;
var myScore;
var collected = 0;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var gravity = 0.05;
var numLives;
var mouseClicked;
var lives = 3;
var score = 0;
var sliceGameMusic;
var sliceGameStopped = false;

var shower = {
    x: Math.random() * width,
    y: height * 0.7,
    width: width * 0.1,
    height: width * 0.1,
    src: "../images/shower.png",
    speed: 15,
    score: 100,
    life: 0,
    hitTop: false,
    dropped: -1
};

var faucet = {
    x: Math.random() * width,
    y: height * 0.7,
    width: width * 0.1,
    height: width * 0.1,
    src: "../images/faucet.png",
    speed: 15,
    score: 100,
    life: 0,
    hitTop: false,
    dropped: -1
};
var washer = {
    x: Math.random() * width,
    y: height * 0.7,
    width: width * 0.1,
    height: width * 0.1,
    src: "../images/washer.png",
    speed: 15,
    score: 100,
    life: 0,
    hitTop: false,
    dropped: -1
};

var waterBottle = {
    x: Math.random() * width,
    y: height * 0.7,
    width: width * 0.1,
    height: height * 0.1,
    src: "../images/waterbottle.png",
    speed: 15,
    score: -100,
    life: -1,
    hitTop: false,
    dropped: 0
};

//cursor
window.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mousemove", mouseMove, false);
window.addEventListener("mouseup", mouseUp, false);

window.addEventListener('touchstart', touchStart, false);
window.addEventListener('touchmove', touchMove, false)
window.addEventListener('touchend', touchEnd, false);

function mouseDown(e) {
    touch = true;
}

function mouseMove(e) {
    if (touch === true && e.pageX <= gameArea.canvas.width
        && e.pageX >= 0 && e.pageY <= gameArea.canvas.height && e.pageY >= 0) {
        gameArea.x = e.pageX;
        gameArea.y = e.pageY;
        console.log("what");
    } else {
        gameArea.x = 0;
        gameArea.y = 0;
    }
}

function mouseUp(e) {
    console.log("touchend");
    touch = false;
    gameArea.x = 0;
    gameArea.y = 0;
}


function touchStart(e) {
    console.log("touched");
    touch = true;
}

function touchMove(e) {
    if (touch === true && e.touches[0].screenX < gameArea.canvas.width) {
        var touchLocation = e.targetTouches[0];
        gameArea.x = touchLocation.pageX;
        gameArea.y = touchLocation.pageY;
        console.log("what");
    } else {
        gameArea.x = 0;
        gameArea.y = 0;
    }
}

function touchEnd(e) {
    console.log("touchend");
    touch = false;
    gameArea.x = 0;
    gameArea.y = 0;
}

function startSliceGame() {
    gameArea.start();
    //sliceGameMusic = new sound("sliceGame.mp3");
    myScore = new componentText(height * 0.05 + "px", "Consolas", "black", 0, height * 0.05, "text");
    numLives = new componentText(height * 0.05 + "px", "Consolas", "black", width * 0.8, height * 0.05, "text");
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        gameArea.canvas = document.createElement("canvas");
        gameArea.canvas.setAttribute("id", "sliceCanvas");
        this.canvas.width = width;
        this.canvas.height = height * 0.7;
        // Adds context
        this.context = this.canvas.getContext("2d");
        let div1 = document.getElementById("sliceGame");
        let div2 = document.getElementById("sliceDIV");
        div1.appendChild(this.canvas);
        div2.style.display = "block";
        this.interval = setInterval(updateGameArea, 20);
        this.frameNum = 0;

    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        sliceGameStopped = true;
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mousedown', mouseDown);
        window.removeEventListener('mouseup', mouseUp);
        window.removeEventListener('touchstart', touchStart);
        window.removeEventListener('touchmove', touchMove);
        window.removeEventListener('touchend', touchEnd);

        /*         clearInterval(this.interval);
                window.removeEventListener('mousemove', mouseMove);
                window.removeEventListener('touchstart', touchStart);
                window.removeEventListener('touchmove', touchMove)
                window.removeEventListener('touchend', touchEnd); */
    }
}

/* // mobile touch
$(document).ready(function () {
    document.getElementById("sliceGame").addEventListener('touchstart', touchStart, false);
    document.getElementById("sliceGame").addEventListener('touchmove', touchMove, false)
    document.getElementById("sliceGame").addEventListener('touchend', touchEnd, false);
}); */


function componentText(fontSize, fontType, color, x, y, text) {
    this.fontSize = fontSize;
    this.fontType = fontType;
    this.x = x;
    this.y = y;
    this.update = function () {
        obj1 = gameArea.context;
        obj1.font = this.fontSize + " " + this.fontType;
        obj1.fillStyle = color;
        obj1.fillText(this.text, this.x, this.y);
    }

}

function newGameObject(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.x = obj.x;
    this.y = obj.y;
    this.src = obj.src;
    this.score = obj.score;
    this.life = obj.life;
    this.dropped = obj.dropped;
    this.hitTop = false;
    this.hitLeft = false;
    this.hitRight = false;
    this.speed = height * 0.01;
    this.direction = Math.floor(Math.random() * 2);
    this.update = function () {
        obj1 = gameArea.context;
        obj1 = new Image(this.width, this.height);
        obj1.src = this.src;
        gameArea.context.drawImage(obj1, this.x, this.y, this.width, this.height);
    }

    this.sliced = function () {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let collide = false;
        if (gameArea.x >= myleft && gameArea.x <= myright
            && gameArea.y >= mytop && gameArea.y <= mybottom) {
            collide = true;
        }
        return collide;
        console.log(collide);
    }

}

function addObjectOntoScreen() {
    let x = Math.floor(Math.random() * (gameArea.canvas.width));
    let y = 1;
    let randCase = Math.floor(Math.random() * 4);
    switch (randCase) {
        case 0:
            objects.push(new newGameObject(waterBottle));
            objects[objects.length - 1].x = x;
            break;
        case 1:
            objects.push(new newGameObject(washer));
            objects[objects.length - 1].x = x;
            break;
        case 2:
            objects.push(new newGameObject(faucet));
            objects[objects.length - 1].x = x;
            break;
        case 3:
            objects.push(new newGameObject(shower));
            objects[objects.length - 1].x = x;
            break;
        default:
            break;
    }
}
function updateGameArea() {
    width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    gameArea.canvas.width = width;
    gameArea.canvas.height = height * 0.7;
    var x, y;

    gameArea.clear();
    if (sliceGameStopped === false) {
        gameArea.frameNum += 1;
    }
    var rand = Math.floor(Math.random() * (120 - 50)) + 50;
    if (gameArea.frameNum === 1 || everyinterval(rand) && sliceGameStopped === false) {
        addObjectOntoScreen();
        //console.log(objects);
    }
    if (everyinterval(80) && sliceGameStopped === false) {
        addObjectOntoScreen();
    }

    for (let i = objects.length - 1; i >= 0; i--) {

        objects[i].width = width * 0.1;
        objects[i].height = width * 0.1;

        if (sliceGameStopped === false) {
            if (objects[i].x <= 0) {
                objects[i].x = objects[i].x + 1;
                objects[i].hitLeft = true;
            } else if (objects[i].x >= width - objects[i].width) {
                objects[i].x = objects[i].x - 1;
                objects[i].hitRight = true;
            } else if (objects[i].hitLeft == true) {
                objects[i].x = objects[i].x + 1;
            } else if (objects[i].hitRight == true) {
                objects[i].x = objects[i].x - 1;
            } else {
                switch (objects[i].direction) {
                    case 0:
                        objects[i].x = objects[i].x + 1;
                        break;
                    case 1:
                        objects[i].x = objects[i].x - 1;
                        break;
                    default:
                        break;
                }
            }

            if (objects[i].y <= height * 0.05) {
                objects[i].hitTop = true;
                objects[i].speed = 0;

            }
            if (objects[i].hitTop == true) {
                objects[i].speed += gravity;
                objects[i].y += 1 + objects[i].speed;
                //console.log(objects[i].speed);
            } else {
                objects[i].speed -= height * 0.0001;
                objects[i].y -= 1 + objects[i].speed;
            }
        }

        objects[i].update();

        if (sliceGameStopped === false) {
            if (objects[i].y >= height * 0.7) {
                lives = lives + objects[i].dropped;
                objects.splice(i, 1);
                //console.log(objects);
            } else if (objects[i].sliced()) {
                score = score + objects[i].score;
                lives = lives + objects[i].life;
                objects.splice(i, 1);

            }
            if (lives <= 0) {
                //gameArea.clear();
                gameArea.stop();
            }
        }
    }

    myScore.text = "Score: " + score;
    myScore.fontSize = width * 0.03 + "px";
    numLives.fontSize = width * 0.03 + "px";
    numLives.x = width * 0.8;
    numLives.text = "Lives: " + lives;
    numLives.update();
    myScore.update();
}

function everyinterval(n) {
    if ((gameArea.frameNum / n) % 1 == 0) { return true; }
    return false;
}

/* Button Functionality. */

function initializeRaindropButtons() {
    var nextButton = document.getElementById("next");
    //console.log(nextButton);

    nextButton.addEventListener("click", nextClick, false);

    /*     function nextClick() {
            pageOpen = true;
            var removeCanvas = document.getElementsByTagName("canvas");
            var div1 = document.getElementById("raindropGame");
            removeCanvas[0].remove(document.body);
            startRaindropGame();
        } */

    function nextClick() {
        console.log((Math.ceil(gameArea.frameNum / 50)));
        if (collected == 100) {
            blackout();
            window.location.href = "./transitionPage2.html";
        } else if ((Math.ceil(gameArea.frameNum / 50) == 20)) {
            blackout();
            window.location.href = "./transitionPage2.html";
        } else {
            console.log("Game not completed.");
        }

    }

    function blackout() {
        $('#overlay').animate({
            opacity: 1,
        }, 1500, function () {

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


/*          var el = document.getElementById('sliceCanvas');
            console.log(el);
            var ctx = el.getContext('2d');
            
            ctx.lineWidth = 10;
            ctx.lineJoin = ctx.lineCap = 'round';
            ctx.strokeStyle="#FF0000";
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgb(100, 50, 234)';
            
            var isDrawing, points = [ ];
            
            el.onmousedown = function(e) {
              isDrawing = true;
              points.push({ x: e.clientX, y: e.clientY });
            };
            
            el.onmousemove = function(e) {
              if (!isDrawing) return;
            
              points.push({ x: e.clientX, y: e.clientY });
            
              ctx.beginPath();
              ctx.moveTo(points[0].x, points[0].y);
              for (var i = 1; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
              }
              ctx.stroke();
            };
            
            el.onmouseup = function() {
              isDrawing = false;
              points.length = 0;
            }; */