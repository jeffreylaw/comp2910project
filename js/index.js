//--------------------------------------------mini game 1-------------------------------------------//
//--------------------------------------------mini game 1-------------------------------------------//
//--------------------------------------------mini game 1-------------------------------------------//
//--------------------------------------------mini game 1-------------------------------------------//
//--------------------------------------------mini game 1-------------------------------------------//

var bucket;
var background;
var raindrops = [];
var touch = false;
var myScore1;
var collected = 0;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var gravity = 0.05;
var timer1;
var userName;
var raindropGameStopped = false;

window.addEventListener("touchmove", function (event) {
    event.preventDefault();
    event.stopPropagation();
}, false);

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
    bucket = new componentImg(width * 0.1, width * 0.1,
        gameArea.canvas.width / 2 - width * 0.1, gameArea.canvas.height - height * 0.1, "./images/minigame1/bucket.png");
    myScore1 = new componentText(height * 0.05 + "px", "Consolas", "black", 0, height * 0.05, "text");
    timer1 = new componentText(height * 0.05 + "px", "Consolas", "black", width * 0.8, height * 0.05, "text");
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        gameArea.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height * 0.65;
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
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        //clearInterval(this.interval);
        raindropGameStopped = true;
        $('#next').show(0);
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
    this.update = function () {
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
    this.update = function () {
        obj1 = gameArea.context;
        obj1 = new Image(this.width, this.height);
        obj1.src = src;
        gameArea.context.drawImage(obj1, this.x, this.y, this.width, this.height);

    }
    this.collideWith = function (otherobj) {
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
    gameArea.canvas.height = height * 0.65;
    bucket.y = gameArea.canvas.height - bucket.height;
    bucket.width = width * 0.1;
    bucket.height = width * 0.1;
    var x, y;
    for (let i = 0; i < raindrops.length; i++) {
        raindrops[i].width = width * 0.05;
        raindrops[i].height = width * 0.05;
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

    if (raindropGameStopped === false) {
        gameArea.frameNum += 1;
    }
    // Update background first



    if (gameArea.frameNum === 1 || everyinterval(30)
        && raindropGameStopped === false) {
        x = Math.floor(Math.random() * (gameArea.canvas.width));
        y = 1;
        raindrops.push(new componentImg(width * 0.05, width * 0.05, x, y, "./images/minigame1/raindrop.png"));
    }
    for (let i = 0; i < raindrops.length; i++) {
        if (raindropGameStopped === false) {
            raindrops[i].gravitySpeed += gravity;
            raindrops[i].y += 1 + raindrops[i].gravitySpeed;
        }
        if (raindrops[i].y > gameArea.canvas.height) {
            raindrops.splice(i, 1);
        }
        raindrops[i].update();
    }

    // cursor
    if (gameArea.x) {
        bucket.x = gameArea.x - bucket.width / 2;
    }
    //touch
    if (gameArea.touchX) {
        bucket.x = gameArea.x - bucket.width / 2;
    }
    myScore1.fontSize = width * 0.03 + "px";
    timer1.fontSize = width * 0.03 + "px";
    myScore1.text = "Collected: " + collected + "%";
    timer1.text = "Time: " + (20 - Math.ceil(gameArea.frameNum / 50))
    timer1.x = width * 0.8;
    if ((20 - Math.ceil(gameArea.frameNum / 50) == 0)) {
        gameArea.stop();
    }
    timer1.update();
    myScore1.update();
    bucket.update();
}

function everyinterval(n) {
    if ((gameArea.frameNum / n) % 1 == 0) { return true; }
    return false;
}

//--------------------------------------------Mini Game2--------------------------------------------//
//--------------------------------------------Mini Game2--------------------------------------------//
//--------------------------------------------Mini Game2--------------------------------------------//
//--------------------------------------------Mini Game2--------------------------------------------//
//--------------------------------------------Mini Game2--------------------------------------------//

var sinkFill = 0;
var timer = 20;
var faucetOn = false;
var faucet1On = false;
var faucet2On = false;
var faucet3On = false;
var faucet4On = false;
var faucet5On = false;
var faucet6On = false;
var faucet7On = false;
var faucet8On = false;
var faucet9On = false;
var gameOver = false;

function updateRandomFaucet() {
    var faucets = document.getElementsByClassName("tap");
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    var sinkFill;

    switch (Math.floor((Math.random() * 8))) {
        case 0:
            if (faucet1On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet1On = true;
                $("#tap1").attr("src", "./images/minigame2/faucetFrame2.png");
                break;
            }
        case 1:
            if (faucet2On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet2On = true;
                $("#tap2").attr("src", "./images/minigame2/faucetFrame2.png");
                break;
            }
        case 2:
            if (faucet3On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet3On = true;
                $("#tap3").attr("src", "./images/minigame2/faucetFrame2.png");
                break;
            }
        case 3:
            if (faucet4On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet4On = true;
                $("#tap4").attr("src", "./images/minigame2/faucetFrame2.png");
                break;
            }
        case 4:
            if (faucet5On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet5On = true;
                $("#tap5").attr("src", "./images/minigame2/faucetFrame2.png");
                break;
            }
        case 5:
            if (faucet6On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet6On = true;
                faucetOn = true;
                $("#tap6").attr("src", "./images/minigame2/faucetFrame2.png");
                break;
            }
        case 6:
            if (faucet7On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet7On = true;
                faucetOn = true;
                $("#tap7").attr("src", "./images/minigame2/faucetFrame2.png");
                break;
            }

        case 7:
            if (faucet8On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet8On = true;
                faucetOn = true;
                $("#tap8").attr("src", "./images/minigame2/faucetFrame2.png");
                break;
            }

        case 8:
            if (faucet9On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet9On = true;
                faucetOn = true;
                $("#tap9").attr("src", "./images/minigame2/faucetFrame2.png");
                break;
            }


        default:
            faucet1On = true;
            faucet2On = true;
            faucet3On = true;
            faucet4On = true;
            faucet5On = true;
            faucet6On = true;
            faucet7On = true;
            faucet8On = true;
            faucet9On = true;
            for (let i = 0; i < faucets.length; i++) {
                faucets[i].setAttribute("src", "./images/minigame2/faucetFrame2.png");
            }
            break;
    }
    if (timer <= 0 || sinkFill >= 300) {
        return;
    }
    var rand = Math.floor(Math.random() * (1500 - 500)) + 500;
    setTimeout(updateRandomFaucet, rand);
}



/*  ////////////////////////////////////// */
var sinkFill = 0;

function startSinkFill() {
    setInterval(function () {
        var numFaucetsOn = 0;
        if (faucet1On) {
            numFaucetsOn++;
        }
        if (faucet2On) {
            numFaucetsOn++;
        }
        if (faucet3On) {
            numFaucetsOn++;
        }
        if (faucet4On) {
            numFaucetsOn++;
        }
        if (faucet5On) {
            numFaucetsOn++;
        }
        if (faucet6On) {
            numFaucetsOn++;
        }
        if (faucet7On) {
            numFaucetsOn++;
        }
        if (faucet8On) {
            numFaucetsOn++;
        }
        if (faucet9On) {
            numFaucetsOn++;
        }
        sinkFill = sinkFill + numFaucetsOn;


        if (timer <= 0) {
            gameOver = true;
            return;
        }
        if (sinkFill > 300) {
            gameOver = true;
            $("#text2").html("100%");
            $("#sinkGameWater").css("height", "100%")
            clearInterval(sinkFill);
            return;
        }

        //console.log(sinkFill);
        $("#sinkGameWater").css("height", Math.ceil(sinkFill / 300 * 100) + "%");
        //placeholder (suppose to be random text)
        $("#text2").html(Math.ceil(sinkFill / 300 * 100) + "%");
        $("#timer").html("Time: " + (timer - 1));


    }, 300);

}

function startTimer() {
    setInterval(function () {
        timer--;

        if (gameOver == true || timer <= 0) {
            gameOver = true;
            clearInterval(timer);
            $('#next').show(0);
            return;
        }
        console.log(timer)


    }, 1000);
}

function updateTapPage() {
    var taps = document.getElementsByClassName("tap");
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    var tapHeight = height * 0.19;
    var tapWidth = width * 0.19;
    for (let i = 0; i < taps.length; i++) {
        if (width > height) {
            taps[i].style.width = "auto";
            taps[i].style.height = "19vh";
        } else {
            taps[i].style.height = "auto";
            taps[i].style.width = "19%";
        }
    }
    if (width > height) {
        $("#tap2").css("left", (width / 2 - tapHeight / 2) + "px");
        $("#tap5").css("left", (width / 2 - tapHeight / 2) + "px");
        $("#tap8").css("left", (width / 2 - tapHeight / 2) + "px");
    } else {
        $("#tap2").css("left", (width / 2 - tapWidth / 2) + "px");
        $("#tap5").css("left", (width / 2 - tapWidth / 2) + "px");
        $("#tap8").css("left", (width / 2 - tapWidth / 2) + "px");
    }

    setTimeout(updateTapPage, 10);
}


//--------------------------------------------Mini Game3--------------------------------------------//
//--------------------------------------------Mini Game3--------------------------------------------//
//--------------------------------------------Mini Game3--------------------------------------------//
//--------------------------------------------Mini Game3--------------------------------------------//
//--------------------------------------------Mini Game3--------------------------------------------//

var objects = [];
var touch2 = false;
var myScore2;
var collected = 0;
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
    src: "./images/minigame3/shower.png",
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
    src: "./images/minigame3/faucet.png",
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
    src: "./images/minigame3/washer.png",
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
    src: "./images/minigame3/waterBottle.png",
    speed: 15,
    score: -100,
    life: -1,
    hitTop: false,
    dropped: 0
};

window.addEventListener("mousedown", mouseDown2, false);
window.addEventListener("mousemove", mouseMove2, false);
window.addEventListener("mouseup", mouseUp2, false);

window.addEventListener('touchstart', touchStart2, false);
window.addEventListener('touchmove', touchMove2, false)
window.addEventListener('touchend', touchEnd2, false);

function mouseDown2(e) {
    touch2 = true;
}

function mouseMove2(e) {
    if (touch2 === true && e.pageX <= gameArea2.canvas.width
        && e.pageX >= 0 && e.pageY <= gameArea2.canvas.height && e.pageY >= 0) {
        gameArea2.x = e.pageX;
        gameArea2.y = e.pageY;
        console.log("what");
    } else {
        gameArea2.x = 0;
        gameArea2.y = 0;
    }
}

function mouseUp2(e) {
    console.log("touchend");
    touch2 = false;
    gameArea2.x = 0;
    gameArea2.y = 0;
}


function touchStart2(e) {
    console.log("2touched");
    touch2 = true;
}

function touchMove2(e) {
    if (touch2 === true && e.touches[0].screenX < gameArea.canvas.width) {
        var touchLocation = e.targetTouches[0];
        gameArea2.x = touchLocation.pageX;
        gameArea2.y = touchLocation.pageY;
        console.log("2what");
    } else {
        gameArea2.x = 0;
        gameArea2.y = 0;
    }
}

function touchEnd2(e) {
    console.log("2touchend");
    touch2 = false;
    gameArea2.x = 0;
    gameArea2.y = 0;
}

function startSliceGame() {
    gameArea2.start();
    //sliceGameMusic = new sound("sliceGame.mp3");
    myScore2 = new componentText2(height * 0.05 + "px", "Consolas", "black", 0, height * 0.05, "text");
    numLives = new componentText2(height * 0.05 + "px", "Consolas", "black", width * 0.8, height * 0.05, "text");
}

var gameArea2 = {
    canvas: document.createElement("canvas"),
    start: function () {
        gameArea2.canvas = document.createElement("canvas");
        gameArea2.canvas.setAttribute("id", "sliceCanvas");
        this.canvas.width = width;
        this.canvas.height = height * 0.65;
        // Adds context
        this.context = this.canvas.getContext("2d");
        let div1 = document.getElementById("sliceGame");
        let div2 = document.getElementById("sliceDIV");
        div1.appendChild(this.canvas);
        div2.style.display = "block";
        this.interval = setInterval(updateGameArea2, 20);
        this.frameNum = 0;

    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        sliceGameStopped = true;
        window.removeEventListener('mousemove', mouseMove2);
        window.removeEventListener('mousedown', mouseDown2);
        window.removeEventListener('mouseup', mouseUp2);
        window.removeEventListener('touchstart', touchStart2);
        window.removeEventListener('touchmove', touchMove2);
        window.removeEventListener('touchend', touchEnd2);

        /*         clearInterval(this.interval);
                window.removeEventListener('mousemove', mouseMove);
                window.removeEventListener('touchstart', touchStart);
                window.removeEventListener('touchmove', touchMove)
                window.removeEventListener('touchend', touchEnd); */
    }
}

function componentText2(fontSize, fontType, color, x, y, text) {
    this.fontSize = fontSize;
    this.fontType = fontType;
    this.x = x;
    this.y = y;
    this.update = function () {
        obj1 = gameArea2.context;
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
        obj1 = gameArea2.context;
        obj1 = new Image(this.width, this.height);
        obj1.src = this.src;
        gameArea2.context.drawImage(obj1, this.x, this.y, this.width, this.height);
    }

    this.sliced = function () {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let collide = false;
        if (gameArea2.x >= myleft && gameArea2.x <= myright
            && gameArea2.y >= mytop && gameArea2.y <= mybottom) {
            collide = true;
        }
        return collide;
        console.log(collide);
    }

}

function addObjectOntoScreen() {
    let x = Math.floor(Math.random() * (gameArea2.canvas.width));
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

function updateGameArea2() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    gameArea2.canvas.width = width;
    gameArea2.canvas.height = height * 0.65;
    var x, y;

    gameArea2.clear();
    if (sliceGameStopped === false) {
        gameArea2.frameNum += 1;

        var rand = Math.floor(Math.random() * (120 - 50)) + 50;
        if (gameArea2.frameNum === 1 || everyinterval2(rand)) {
            addObjectOntoScreen();
            //console.log(objects);
        }
        if (everyinterval2(80)) {
            addObjectOntoScreen();
        }
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
            if (lives <= 0 || score == 3000) {
                $('#next').show(0);
                gameArea2.stop();
            }
        }
    }

    myScore2.text = "Score: " + score;
    myScore2.fontSize = width * 0.03 + "px";
    numLives.fontSize = width * 0.03 + "px";
    numLives.x = width * 0.8;
    numLives.text = "Lives: " + lives;
    numLives.update();
    myScore2.update();
}

function everyinterval2(n) {
    if ((gameArea2.frameNum / n) % 1 == 0) { return true; }
    return false;
}

//----------------------------------------------story-----------------------------------------------//
//----------------------------------------------story-----------------------------------------------//
//----------------------------------------------story-----------------------------------------------//
//----------------------------------------------story-----------------------------------------------//
//----------------------------------------------story-----------------------------------------------//

var textbox;
var start;
var next;
var textNum = 0;
var lines = [];
var lines2 = [];
var lines3 = [];
var secondSceneNum = 100;
var thirdSceneNum = 200;
var lastSceneNum = 300;
var employer = "<b>Tommy:<br/></b>";
var questionMark = "<b>???:<br/></b>";
var gardener = "<b>Lily:<br/></b>";
var chef = "<b>Olivia:<br/></b>";
var maintenanceGuy = "<b>Richard:<br/></b>";


function startStoryGame() {
    storyArea.start();
}

var storyArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        storyArea.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height * 0.65;
        // Adds context
        this.context = this.canvas.getContext("2d");
        let div = document.getElementById("beginningPage");
        div.appendChild(this.canvas);
        this.interval = setInterval(updateStoryArea, 20);
        this.canvas.style.cursor = "none";
        this.frameNum = 0;
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('touchstart', touchStart);
        window.removeEventListener('touchmove', touchMove)
        window.removeEventListener('touchend', touchEnd);
    }
}

function componentStoryImg(width, height, x, y, src) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.update = function () {
        obj1 = storyArea.context;
        obj1 = new Image(this.width, this.height);
        obj1.src = src;
        storyArea.context.drawImage(obj1, this.x, this.y, this.width, this.height);
    }
}

function updateStoryArea() {
    width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    storyArea.canvas.width = width;
    storyArea.canvas.height = height * 0.65;
    var x, y;
    storyArea.clear();
}

$.ajax({
    url: "./js/transitionPage_gettable.php",
    dataType: "json",
    type: "GET",
    data: { output: 'json' },
    success: function (data) {

        console.log(data);
        var i = 0;
        var j = 0;
        var x = 0;
        for (i in data.firstscene) {
            lines[i] = data.firstscene[i].dialogue;
        }
        for (j in data.secondscene) {
            lines2[j] = data.secondscene[j].dialogue;
        }
        for (x in data.thirdscene) {
            lines3[x] = data.thirdscene[x].dialogue;
        }
    }
});

function nameCancel() {
    document.getElementById('nameBlank').style.display = 'none';
}




$(document).ready(function () {

    $('#sinkGameWater').hide(0);
    $('#sinkGame').hide(0);
    $('#beginningPage').hide(0);
    $('#text1').hide(0);
    $('#next').hide(0);
    $('#sliceDIV').hide(0);
    $('#sliceGame').hide(0);

    //for mini game2---------------------------------------------------------------------------------

    $("#tap1").click(function () {
        //console.log("clciked??");
        faucetOn = false;
        faucet1On = false;
        $("#tap1").attr("src", "./images/minigame2/faucet.png");
    });

    $("#tap2").click(function () {
        faucetOn = false;
        faucet2On = false;
        $("#tap2").attr("src", "./images/minigame2/faucet.png");
    });

    $("#tap3").click(function () {
        faucetOn = false;
        faucet3On = false;
        $("#tap3").attr("src", "./images/minigame2/faucet.png");
    });

    $("#tap4").click(function () {
        faucetOn = false;
        faucet4On = false;
        $("#tap4").attr("src", "./images/minigame2/faucet.png");
    });

    $("#tap5").click(function () {
        faucetOn = false;
        faucet5On = false;
        $("#tap5").attr("src", "./images/minigame2/faucet.png");
    });

    $("#tap6").click(function () {
        faucetOn = false;
        faucet6On = false;
        $("#tap6").attr("src", "./images/minigame2/faucet.png");
    });
    $("#tap7").click(function () {
        faucetOn = false;
        faucet7On = false;
        $("#tap7").attr("src", "./images/minigame2/faucet.png");
    });
    $("#tap8").click(function () {
        faucetOn = false;
        faucet8On = false;
        $("#tap8").attr("src", "./images/minigame2/faucet.png");
    });
    $("#tap9").click(function () {
        faucetOn = false;
        faucet9On = false;
        $("#tap9").attr("src", "./images/minigame2/faucet.png");
    });

    //----------------------------------------------------------------------------------------------


    function nameConfirm() {
        userName = document.getElementById('userNameInput').value;
        if (userName.trim().length == 0) {
            document.getElementById('nameBlank').style.display = 'inline';
        } else if (userName.toUpperCase() === 'BCIT') {
            //Put code here to transition to comic
        } else {
            $('#overlay').animate({
                opacity: 1,
            }, 1000, function () {
            });
            setTimeout(transitionPage, 1000);
        }
    }


    function transitionPage() {
        $('#divID').remove(0);
        $('#overlay').animate({
            opacity: 0,
        }, 1000, function () { });
        $('#beginningPage').show(0);
        startStoryGame();
        $('#text1').show(0);
        $('#next').show(0);
        $('#myModal').remove(0);
        $('#promtBox').remove(0);
        $("promptBoxContent").remove(0);
    }

    $('#ok').click(function () {
        nameConfirm();
    })

    $("#next").click(function () {
        var user = "<b>" + userName + ":<br/></b>";
        textNum++;

        console.log(textNum);
        switch (textNum) {
            case 1:
                $("#text1").html(lines[0]);
                break;
            case 2:
                $("#text1").html(lines[1]);
                break;
            case 3:
                $("#text1").html("<b>Employee:<br/></b>" + lines[2]);
                break;
            case 4:
                $("#text1").html(user + lines[3]);
                break;
            case 5:
                $("#text1").html("<b>Employee:<br/></b>" + userName + "! "+ lines[4]);
                break;
            case 6:
                $("#text1").html(user + lines[5]);
                break;
            case 7:
                $("#text1").html("<b>Employee:<br/></b>" + lines[6]);
                break;
            case 8:
                $("#text1").html("<b>Employee:<br/></b>" + lines[7]);
                break;
            case 9:
                $("#text1").html("<b>Employee:<br/></b>" + lines[8]);
                break;
            case 10:
                $("#text1").html(user + lines[9]);
                break;
            case 11:
                $("#text1").html("<b>Employee:<br/></b>" + lines[10]);
                break;
            case 12:
                animateDiv();
                document.getElementById("beginningPage").style.backgroundImage = 'url("./images/background/lobby_day.jpg")';
                $("#text1").html("<b>Employee:<br/></b>" + lines[11] + " " + userName);
                break;
            case 13:
                $("#text1").html("<b>Employee:<br/></b>" + lines[12]);
                break;
            case 14:
                $("#text1").html(employer + lines[13]);
                break;
            case 15:
                $("#text1").html(employer + lines[14]);
                break;
            case 16:
                animateDiv();
                document.getElementById("beginningPage").style.backgroundImage = 'url("./images/background/basement.jpg")';
                $("#text1").html(employer + lines[15]);
                break;
            case 17:
                $("#text1").html(employer + lines[16]);
                break;
            case 18:
                $("#text1").html(lines[17]);
                break;
            case 19:
                $("#text1").html(user + lines[18]);
                break;
            case 20:
                $("#text1").html(employer + lines[19]);
                break;
            case 21:
                $("#text1").html(employer + lines[20]);
                break;
            case 22:
                $("#text1").html(employer + lines[21]);
                break;
            case 23:
                $("#text1").html(employer + lines[22]);
                break;
            case 24:
                $("#text1").html(employer + lines[23]);
                break;
            case 25:
                $("#text1").html(lines[24]);
                break;
            case 26:
                $("#text1").html(user + lines[25]);
                break;
            case 27:
                $("#text1").html(lines[26]);
                break;
            case 28:
                $("#text1").html(user + lines[27]);
                break;
            case 29:
                $("#text1").html(employer + lines[28]);
                break;
            case 30:
                $("#text1").html(user + lines[29]);
                break;
            case 31:
                $("#text1").html(employer + lines[30]);
                break;
            case 32:
                $("#text1").html(user + lines[31]);
                break;
            case 33:
                $("#text1").html(user + lines[32]);
                break;
            case 34:
                $("#next").hide(0);
                $('#overlay').animate({
                    opacity: 1,
                }, 1500, function () {
                });
                setTimeout(nextMinigame1, 1500);
                break;
            case 35:
                nextEndGame();
                break;
            case (secondSceneNum + 1):
                animateDiv();
                $('#raindropDIV').remove(0);
                $('#raindropGame').remove(0);
                $('#beginningPage').show(0);
                $("#text1").html(employer + lines2[0]);
                break;
            case 102:
                $("#text1").html(employer + lines2[1]);
                break;
            case 103:
                $("#text1").html(employer + lines2[2]);
                break;
            case 104:
                $("#text1").html(questionMark + lines2[3]);
                break;
            case 105:
                $("#text1").html(questionMark + lines2[4]);
                break;
            case 106:
                $("#text1").html(user + lines2[5]);
                break;
            case 107:
                $("#text1").html(maintenanceGuy + lines2[6]);
                break;
            case 108:
                $("#text1").html(maintenanceGuy + lines2[7]);
                break;
            case 109:
                $("#text1").html(maintenanceGuy + lines2[8]);
                break;
            case 110:
                $("#text1").html(employer + lines2[9]);
                break;
            case 111:
                $("#text1").html(maintenanceGuy + lines2[10]);
                break;
            case 112:
                $("#text1").html(employer + lines2[11]);
                break;
            case 113:
                $("#text1").html(maintenanceGuy + lines2[12]);
                break;
            case 114:
                $("#text1").html(maintenanceGuy + lines2[13]);
                break;
            case 115:
                $("#text1").html(user + lines2[14]);
                break;
            case 116:
                $("#text1").html(user + lines2[15]);
                break;
            case 117:
                $("#text1").html(maintenanceGuy + lines2[16]);
                break;
            case 118:
                $("#text1").html(maintenanceGuy + lines2[17]);
                break;
            case 119:
                $("#text1").html(employer + lines2[18]);
                break;
            case 120:
                $("#text1").html(user + lines2[19]);
                break;
            case 121:
                $("#text1").html(user + lines2[20]);
                break;
            case 122:
                $("#text1").html(user + lines2[21]);
                break;
            case 123:
                $("#text1").html(employer + lines2[22]);
                break;
            case 124:
                $("#text1").html(employer + lines2[23]);
                break;
            case 125:
                $("#text1").html(user + lines2[24]);
                break;
            case 126:
                animateDiv();
                document.getElementById("beginningPage").style.backgroundImage = 'url("./images/background/garden_pavillion.jpg")';
                $("#text1").html(lines2[25]);
                break;
            case 127:
                $("#text1").html(employer + "<i>" + lines2[26] + "</i>");
                break;
            case 128:
                $("#text1").html(employer + lines2[27]);
                break;
            case 129:
                $("#text1").html("<b>Gardener:<br/></b>" + lines2[28]);
                break;
            case 130:
                $("#text1").html(gardener + lines2[29]);
                break;
            case 131:
                $("#text1").html(gardener + lines2[30]);
                break;
            case 132:
                $("#text1").html(employer + lines2[31]);
                break;
            case 133:
                $("#text1").html(gardener + lines2[32]);
                break;
            case 134:
                $("#text1").html(employer + lines2[33]);
                break;
            case 135:
                $("#text1").html(employer + lines2[34]);
                break;
            case 136:
                $("#text1").html(gardener + lines2[35]);
                break;
            case 137:
                $("#text1").html(employer + lines2[36]);
                break;
            case 138:
                $("#text1").html(gardener + lines2[37]);
                break;
            case 139:
                $("#text1").html(gardener + lines2[38]);
                break;
            case 140:
                $("#text1").html(gardener + lines2[39]);
                break;
            case 141:
                $("#text1").html(employer + lines2[40]);
                break;
            case 142:
                $("#text1").html(gardener + lines2[41]);
                break;
            case 143:
                $("#text1").html(employer + lines2[42]);
                break;
            case 144:
                $("#text1").html(gardener + lines2[43]);
                break;
            case 145:
                $("#text1").html(employer + lines2[44]);
                break;
            case 146:
                $("#text1").html(gardener + lines2[45]);
                break;
            case 147:
                $("#text1").html(employer + lines2[46]);
                break;
            case 148:
                $("#text1").html(gardener + lines2[47]);
                break;
            case 149:
                $("#text1").html(gardener + lines2[48]);
                break;
            case 150:
                $("#text1").html(employer + lines2[49]);
                break;
            case 151:
                $("#text1").html(employer + lines2[50]);
                break;
            case 152:
                $("#text1").html(employer + lines2[51]);
                break;
            case 153:
                $("#text1").html(employer + lines2[52]);
                break;
            case 154:
                $("#text1").html(gardener + lines2[53]);
                break;
            case 155:
                $("#text1").html(gardener + lines2[54]);
                break;                
            case 156:
                $("#text1").html(employer + lines2[55]);
                break;
            case 157:
                $("#text1").html(employer + lines2[56]);
                break;
            case 158:
                animateDiv();
                document.getElementById("beginningPage").style.backgroundImage = 'url("./images/background/kitchen.jpg")';
                $("#text1").html(user + lines2[57]);
                break;
            case 159:
                $("#text1").html(user + lines2[58]);
                break;
            case 160:
                $("#text1").html(lines2[59]);
                break;
            case 161:
                $("#text1").html(user + lines2[60]);
                break;
            case 162:
                $("#text1").html(user + lines2[61]);
                break;
            case 163:
                $("#next").hide(0);
                $('#overlay').animate({
                    opacity: 1,
                }, 1500, function () {
                });
                setTimeout(nextMinigame2, 1500);
                break;
            case 164:
                $("#text1").show(0);
                $("#text2").hide(0);
                console.log("g");
                nextEndGame2();
                break;
            case (thirdSceneNum + 1):
                animateDiv();
                $('#sinkGameWater').hide(0);
                $('#sinkGame').hide(0);
                $('#beginningPage').show(0);
                $("#text1").html(questionMark + lines3[0] + " " + lines3[1]);
                break;
            case 202:
                $("#text1").html(user + lines3[2] + " " + userName + ".");
                break;
            case 203:
                $("#text1").html(user + lines3[3]);
                break;
            case 204:
                $("#text1").html(questionMark + lines3[4]);
                break;
            case 205:
                $("#text1").html(chef + lines3[5]);
                break;
            case 206:
                $("#text1").html(chef + lines3[6]);
                break;
            case 207:
                $("#text1").html(user + lines3[7]);
                break;
            case 208:
                $("#text1").html(user + lines3[8]);
                break;
            case 209:
                $("#text1").html(chef + lines3[9]);
                break;
            case 210:
                $("#text1").html(user + lines3[10]);
                break;
            case 211:
                $("#text1").html(chef + lines3[11]);
                break;
            case 212:
                $("#text1").html(chef + lines3[12]);
                break;
            case 213:
                $("#text1").html(user + lines3[13]);
                break;
            case 214:
                $("#text1").html(user + lines3[14]);
                break;
            case 215:
                $("#text1").html(user + lines3[15]);
                break;
            case 216:
                $("#text1").html(chef + lines3[16]);
                break;
            case 217:
                $("#text1").html(chef + lines3[17]);
                break;
            case 218:
                $("#text1").html(user + lines3[18]);
                break;
            case 219:
                $("#text1").html(chef + lines3[19]);
                break;
            case 220:
                $("#text1").html(chef + lines3[20]);
                break;
            case 221:
                $("#text1").html(user + lines3[21]);
                break;
            case 222:
                $("#text1").html(chef + lines3[22]);
                break;
            case 223:
                $("#text1").html(lines3[23]);
                break;
            case 224:
                $("#text1").html(user + lines3[24]);
                break;
            case 225:
                $("#text1").html(chef + lines3[25]);
                break;
            case 226:
                $("#text1").html(user + lines3[26]);
                break;
            case 227:
                $("#text1").html(chef + lines3[27]);
                break;
            case 228:
                $("#text1").html(chef + lines3[28]);
                break;
            case 229:
                $("#text1").html(user + lines3[29]);
                break;
            case 230:
                $("#text1").html(chef + lines3[30]);
                break;
            case 231:
                $("#text1").html(chef + lines3[31]);
                break;
            case 232:
                $("#text1").html(user + lines3[32]);
                break;
            case 233:
                $("#text1").html(chef + lines3[33]);
                break;
            case 234:
                $("#text1").html(chef + lines3[34]);
                break;
            case 235:
                $("#text1").html(user + lines3[35]);
                break;
            case 236:
                $("#text1").html(user + lines3[36]);
                break;
            case 237:
                $("#text1").html(chef + lines3[37]);
                break;
            case 238:
                animateDiv();
                document.getElementById("beginningPage").style.backgroundImage = 'url("./images/background/lobby_night.jpg")';
                $("#text1").html(employer + lines3[38]);
                break;
            case 239:
                $("#text1").html(user + lines3[39]);
                break;
            case 240:
                $("#text1").html(employer + lines3[40]);
                break;
            case 241:
                $("#text1").html(employer + lines3[41]);
                break;
            case 242:
                $("#text1").html(employer + lines3[42]);
                break;
            case 243:
                $("#text1").html(employer + lines3[43]);
                break;
            case 244:
                $("#text1").html(user + lines3[44]);
                break;
            case 245:
                $("#text1").html(user + lines3[45]);
                break;
            case 246:
                $("#text1").html(user + lines3[46]);
                break;
            case 247:
                $("#text1").html(user + lines3[47]);
                break;
            case 248:
                $("#text1").html(employer + lines3[48]);
                break;
            case 249:
                $("#text1").html(lines3[49]);
                break;
            case 250:
                $("#text1").html(employer + lines3[50]);
                break;
            case 251:
                $("#text1").html(user + lines3[51]);
                break;
            case 252:
                $("#text1").html(employer + lines3[52]);
                break;
            case 253:
                $("#text1").html(user + lines3[53]);
                break;
            case 254:
                $("#text1").html(user + lines3[54]);
                break;
            case 255:
                $("#text1").html(user + lines3[55]);
                break;
            case 256:
                $("#text1").html(user + lines3[56]);
                break;
            case 257:
                $("#text1").html(user + lines3[57]);
                break;
            case 258:
                $("#text1").html(maintenanceGuy + lines3[58] + " " + userName + "! " + lines3[59]);
                break;
            case 259:
                $("#next").hide(0);
                $('#overlay').animate({
                    opacity: 1,
                }, 1500, function () {
                });
                setTimeout(nextMinigame3, 1500);
                break;
            case (lastSceneNum+1):
                animateDiv();
                $('#beginningPage').show(0);
                $('#sliceDIV').hide(0);
                $('#sliceGame').hide(0);
                $("#text1").html("test");
                break;
            case 1000:
                animateDiv();
                $('#raindropDIV').remove(0);
                $('#raindropGame').remove(0);
                $('#beginningPage').show(0);
                $("#text1").html(employer + "Although we could not collect all the drops, we fixed the pipes. Everything would be all good for now.");
                textNum = secondSceneNum + 1;
                break;
            case 2000:
                animateDiv();
                $('#sinkGameWater').hide(0);
                $('#sinkGame').hide(0);
                $('#beginningPage').show(0);
                $("#text1").html("failtest");
                break;
            case 2001:
                $("#text1").html(questionMark + lines3[0]);
                textNum = thirdSceneNum+1;
                break;
            case 3000:
                animateDiv();
                $('#beginningPage').show(0);
                $('#sliceDIV').hide(0);
                $('#sliceGame').hide(0);
                $("#text1").html("failtest");
                break;
            case 3001:
                $("#text1").html("test");
                textNum = lastSceneNum+1;
                break;
            default:
                break;
        }

    })

})

function animateDiv() {
    $('#overlay').animate({
        opacity: 1,
    }, 0, function () {
    });
    $('#overlay').animate({
        opacity: 0,
    }, 1000, function () {
    });
}

function nextMinigame1() {
    $('#beginningPage').hide(0);
    $('#raindropDIV').show(0);
    startRaindropGame();
    $('#overlay').animate({
        opacity: 0,
    }, 1000, function () {
    });
    $("#text1").html("Collect the water drops to conserve water.");
}

function nextMinigame2() {
    $("#text1").hide(0);
    $('#beginningPage').hide(0);
    $('#sinkGameWater').show(0);
    $('#sinkGame').show(0);
    startSinkFill();
    updateRandomFaucet();
    updateTapPage();
    startTimer();
    $('#overlay').animate({
        opacity: 0,
    }, 1000, function () {
    });
}

function nextMinigame3() {
    $('#beginningPage').hide(0);
    $('#sliceDIV').show(0);
    $('#sliceGame').show(0);
    startSliceGame();
    $('#overlay').animate({
        opacity: 0,
    }, 1000, function () {
    });
    $("#text1").html("Slice the objects wasting water.");
}

function nextEndGame() {
    console.log((Math.ceil(gameArea.frameNum / 50)));
    console.log(collected);
    if (collected == 100) {
        $("#text1").html("You did it.");
        textNum = secondSceneNum;
    } else if ((Math.ceil(gameArea.frameNum / 50) == 20)) {
        $("#text1").html("You failed to collect the water drop.<br/>You wasted some water.");
        textNum = 999;
    } else {
        console.log("Game not completed.");
    }

}

function nextEndGame2() {
    if (timer > 0) {
        $("#text1").html("You failed to save the water.");
        textNum = 1999;
    } else {
        $("#text1").html("You did it.");
        textNum = thirdSceneNum;
    }
}

function nextEndGame3() {
    if (lives <= 0) {
        $("#text1").html("You failed to save the water.");
        textNum = 2999;
    } else {
        $("#text1").html("You did it.");
        textNum = lastSceneNum;
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
