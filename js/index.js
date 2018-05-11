//--------------------------------------------mini game 1-------------------------------------------//
//--------------------------------------------mini game 1-------------------------------------------//
//--------------------------------------------mini game 1-------------------------------------------//
//--------------------------------------------mini game 1-------------------------------------------//
//--------------------------------------------mini game 1-------------------------------------------//

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
var userName;

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
        gameArea.canvas.width / 2 - width * 0.1, gameArea.canvas.height - height * 0.1, "./images/bucket.png");
    myScore = new componentText(height * 0.05 + "px", "Consolas", "black", 0, height * 0.05, "text");
    timer = new componentText(height * 0.05 + "px", "Consolas", "black", width * 0.8, height * 0.05, "text");
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        gameArea.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height * 0.60;
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
        clearInterval(this.interval);
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
        x = Math.floor(Math.random() * (gameArea.canvas.width));
        y = 1;
        raindrops.push(new componentImg(width * 0.05, width * 0.05, x, y, "./images/raindrop.png"));
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
    if (gameArea.x) {
        bucket.x = gameArea.x - bucket.width / 2;
    }
    //touch
    if (gameArea.touchX) {
        bucket.x = gameArea.x - bucket.width / 2;
    }
    myScore.fontSize = width * 0.03 + "px";
    timer.fontSize = width * 0.03 + "px";
    myScore.text = "Collected: " + collected + "%";
    timer.text = "Time: " + (20 - Math.ceil(gameArea.frameNum / 50))
    timer.x = width * 0.8;
    if ((20 - Math.ceil(gameArea.frameNum / 50) == 0)) {
        gameArea.stop();
    }
    timer.update();
    myScore.update();
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
                $("#tap1").attr("src", "./images/faucetFrame2.png");
                break;
            }
        case 1:
            if (faucet2On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet2On = true;
                $("#tap2").attr("src", "./images/faucetFrame2.png");
                break;
            }
        case 2:
            if (faucet3On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet3On = true;
                $("#tap3").attr("src", "./images/faucetFrame2.png");
                break;
            }
        case 3:
            if (faucet4On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet4On = true;
                $("#tap4").attr("src", "./images/faucetFrame2.png");
                break;
            }
        case 4:
            if (faucet5On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet5On = true;
                $("#tap5").attr("src", "./images/faucetFrame2.png");
                break;
            }
        case 5:
            if (faucet6On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet6On = true;
                faucetOn = true;
                $("#tap6").attr("src", "./images/faucetFrame2.png");
                break;
            }
        case 6:
            if (faucet7On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet7On = true;
                faucetOn = true;
                $("#tap7").attr("src", "./images/faucetFrame2.png");
                break;
            }

        case 7:
            if (faucet8On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet8On = true;
                faucetOn = true;
                $("#tap8").attr("src", "./images/faucetFrame2.png");
                break;
            }

        case 8:
            if (faucet9On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet9On = true;
                faucetOn = true;
                $("#tap9").attr("src", "./images/faucetFrame2.png");
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
                faucets[i].setAttribute("src", "./images/faucetFrame2.png");
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
            $("#text1").html("100%");
            $("#sinkGameWater").css("height", "100%")
            clearInterval(sinkFill);
            return;
        }

        //console.log(sinkFill);
        $("#sinkGameWater").css("height", Math.ceil(sinkFill / 300 * 100) + "%");
        //placeholder (suppose to be random text)
        $("#text1").html(Math.ceil(sinkFill / 300 * 100) + "%");
        $("#timer").html("Time: " + (timer - 1));


    }, 300);

}

function startTimer() {
    setInterval(function () {
        timer--;

        if (gameOver == true || timer <= 0) {
            gameOver = true;
            clearInterval(timer);
            return;
        }
        console.log(timer)


    }, 1000);
}



//----------------------------------------------story-----------------------------------------------//
//----------------------------------------------story-----------------------------------------------//
//----------------------------------------------story-----------------------------------------------//
//----------------------------------------------story-----------------------------------------------//
//----------------------------------------------story-----------------------------------------------//

var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var textbox;
var start;
var next;
var textNum = 1;
var lines = [];

$.ajax({
    url: "./js/transitionPage_gettable.php",
    dataType: "json",
    type: "GET",
    data: { output: 'json' },
    success: function (data) {

        console.log(data);
        var i = 0;
        for (i in data.first) {
            lines[i] = data.first[i].dialogue;

        }
    }
});


$(document).ready(function () {

    $('#sinkGameWater').hide(0);
    $('#sinkGame').hide(0);
    $('#timer').hide(0);
    $('#tap1').hide(0);
    $('#tap2').hide(0);
    $('#tap3').hide(0);
    $('#tap4').hide(0);
    $('#tap5').hide(0);
    $('#tap6').hide(0);
    $('#tap7').hide(0);
    $('#tap8').hide(0);
    $('#tap9').hide(0);
    $('#beginningPage').hide(0);
    $('#text1').hide(0);
    $('#next').hide(0);

    //for mini game2---------------------------------------------------------------------------------

    $("#tap1").click(function () {
        //console.log("clciked??");
        faucetOn = false;
        faucet1On = false;
        $("#tap1").attr("src", "./images/faucet.png");
    });

    $("#tap2").click(function () {
        faucetOn = false;
        faucet2On = false;
        $("#tap2").attr("src", "./images/faucet.png");
    });

    $("#tap3").click(function () {
        faucetOn = false;
        faucet3On = false;
        $("#tap3").attr("src", "./images/faucet.png");
    });

    $("#tap4").click(function () {
        faucetOn = false;
        faucet4On = false;
        $("#tap4").attr("src", "./images/faucet.png");
    });

    $("#tap5").click(function () {
        faucetOn = false;
        faucet5On = false;
        $("#tap5").attr("src", "./images/faucet.png");
    });

    $("#tap6").click(function () {
        faucetOn = false;
        faucet6On = false;
        $("#tap6").attr("src", "./images/faucet.png");
    });
    $("#tap7").click(function () {
        faucetOn = false;
        faucet7On = false;
        $("#tap7").attr("src", "./images/faucet.png");
    });
    $("#tap8").click(function () {
        faucetOn = false;
        faucet8On = false;
        $("#tap8").attr("src", "./images/faucet.png");
    });
    $("#tap9").click(function () {
        faucetOn = false;
        faucet9On = false;
        $("#tap9").attr("src", "./images/faucet.png");
    });

    //----------------------------------------------------------------------------------------------


    $('#startButton').click(function () {
        userName = prompt("Enter your name:");
        console.log(userName);
        if (userName != null) {
            if (userName.trim().length == 0) {
                blankName();
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
            $('#text1').show(0);
            $('#next').show(0);
        }
    })

    $("#next").click(function () {

        textNum++;
        console.log(textNum);
        switch (textNum) {
            case 2:
                $("#text1").html(lines[2]);
                console.log(lines[1]);
                break;
            case 3:
                $("#text1").html(lines[3]);
                break;
            case 4:
                $("#text1").html(lines[4]);
                break;
            case 5:
                animateDiv();
                document.getElementById("beginningPage").style.backgroundImage = "url('./images/testBack.jpeg')";
                $("#text1").html("Hello " + userName + ", " + lines[5]);
                break;
            case 6:
                $("#text1").html(lines[6]);
                break;
            case 7:
                $("#text1").html(lines[7] + " " + lines[8]);
                break;
            case 8:
                $("#text1").html(lines[9] + " " + lines[10]);
                break;
            case 9:
                $("#text1").html(lines[11] + " " + lines[12]);
                break;
            case 10:
                document.getElementById("beginningPage").style.backgroundImage = 'url("./images/testBack2.jpeg")';
                animateDiv();
                $("#text1").html("");
                break;
            case 11:
                $('#overlay').animate({
                    opacity: 1,
                }, 1500, function () {
                });
                setTimeout(nextMinigame1, 1500);
                break;
            case 12:
                nextEndGame();
                break;
            case 13:
                animateDiv();
                $('#raindropDIV').hide(0);
                $('#raindropGame').hide(0);
                $('#beginningPage').show(0);
                document.getElementById("beginningPage").style.backgroundImage = 'url("./images/testBack.jpeg")';
                $("#text1").html("victor is watching me... help!!");
                break;
            case 14:
                $("#text1").html("Time for testing second game");
                break;
            case 15:
                $('#overlay').animate({
                    opacity: 1,
                }, 1500, function () {
                });
                setTimeout(nextMinigame2, 1500);
                break;
            case 1000:
                textNum = 13;
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
    $('#next').hide(0);
    startRaindropGame();
    $('#overlay').animate({
        opacity: 0,
    }, 1000, function () {
    });
    $("#text1").html("RandomFactsHereThat change over time.");
}

function nextMinigame2() {
    $('#beginningPage').hide(0);
    $('#next').hide(0);
    $('#sinkGameWater').show(0);
    $('#sinkGame').show(0);
    $('#timer').show(0);
    $('#tap1').show(0);
    $('#tap2').show(0);
    $('#tap3').show(0);
    $('#tap4').show(0);
    $('#tap5').show(0);
    $('#tap6').show(0);
    $('#tap7').show(0);
    $('#tap8').show(0);
    $('#tap9').show(0);
    startSinkFill();
    updateRandomFaucet();
    startTimer();
    $('#overlay').animate({
        opacity: 0,
    }, 1000, function () {
    });
    $("#text1").html("RandomFactsHereThat change over time.");
}

function updatePage() {
    var taps = document.getElementsByClassName("tap");
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
    }
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


function nextEndGame() {
    console.log((Math.ceil(gameArea.frameNum / 50)));
    console.log(collected);
    if (collected == 100) {
        $("#text1").html("You did it.");
    } else if ((Math.ceil(gameArea.frameNum / 50) == 20)) {
        $("#text1").html("You suck you bad stop qq.");
        textNum = 999;
    } else {
        console.log("Game not completed.");
    }

}
