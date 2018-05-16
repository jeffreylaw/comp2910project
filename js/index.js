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
var timer1;
var userName;

window.addEventListener("touchmove", function(event) {
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
        gameArea.canvas.width / 2 - width * 0.1, gameArea.canvas.height - height * 0.1, "./images/bucket.png");
    myScore = new componentText(height * 0.05 + "px", "Consolas", "black", 0, height * 0.05, "text");
    timer1 = new componentText(height * 0.05 + "px", "Consolas", "black", width * 0.8, height * 0.05, "text");
}

var gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        gameArea.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height * 0.69;
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
    timer1.fontSize = width * 0.03 + "px";
    myScore.text = "Collected: " + collected + "%";
    timer1.text = "Time: " + (20 - Math.ceil(gameArea.frameNum / 50))
    timer1.x = width * 0.8;
    if ((20 - Math.ceil(gameArea.frameNum / 50) == 0)) {
        gameArea.stop();
    }
    timer1.update();
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

        console.log(userName);


        function transitionPage() {
            $('#divID').remove(0);
            $('#overlay').animate({
                opacity: 0,
            }, 1000, function () { });
            $('#beginningPage').show(0);
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

        textNum++;
        console.log(textNum);
        switch (textNum) {
            case 1:
                $("#text1").html(lines[0]);
                break;
            case 2:
                $("#text1").html("Employee: " + "<br/>" + lines[1]);
                console.log(lines[1]);
                break;
            case 3:
                $("#text1").html(userName + ":" + "<br/>" + lines[2]);
                break;
            case 4:
                $("#text1").html("Employee: " + "<br/>" + userName+ "! " + lines[3]);
                break;
            case 5:
                $("#text1").html(userName + ":" + "<br/>" + lines[4]);
                break;
            case 6:
                $("#text1").html("Employee: " + "<br/>" + lines[5]);
                break;
            case 7:
                $("#text1").html("Employee: " + "<br/>" + lines[6]);
                break;
            case 8:
                $("#text1").html(userName + ":" + "<br/>" + lines[7]);
                break;
            case 9:
                $("#text1").html("Employee: " + "<br/>" + lines[8]);
                break;
            case 10:
//                document.getElementById("beginningPage").style.backgroundImage = 'url("./images/testBack2.jpeg")';
                animateDiv();
                $("#text1").html("Employee: " + "<br/>" + lines[9] + ", " + userName);
                break;
            case 11:
                $("#text1").html("Employee: " + "<br/>" + lines[10]);
                break;
            case 12 :
                $("#text1").html("Employee: " + "<br/>" + lines[11]);
                break;
            case 13:
                animateDiv();
                $("#text1").html("Employee: " + "<br/>" + lines[12]);
                break;
            case 14:
                $("#text1").html(lines[13]);
                break;
            case 15:
                $("#text1").html(userName + ":" + "<br/>" + lines[14]);
                break;
            case 16:
                $("#text1").html("Employee: " + "<br/>" + lines[15]);
                break;
            case 17:
                $("#text1").html("Employee: " + "<br/>" + lines[16]);
                break;
            case 18:
                $("#text1").html(lines[17]);
                break;
            case 19:
                $("#text1").html(userName + ":" + "<br/>" + lines[18]);
                break;
            case 20:
                $("#text1").html("Employee: " + "<br/>" + lines[19]);
                break;
            case 21:
                $("#text1").html(userName + ":" + "<br/>" + lines[20]);
                break;
            case 22:
                $("#text1").html("Employee: " + "<br/>" + lines[21]);
                break;
            case 23:
                $("#text1").html(userName + ":" + "<br/>" + lines[22]);
                break;
            case 24:
                $("#text1").html(userName + ":" + "<br/>" + lines[23]);
                break;
            case 25:
                $("#next").hide(0);
                $('#overlay').animate({
                    opacity: 1,
                }, 1500, function () {
                });
                setTimeout(nextMinigame1, 1500);
                break;
            case 26:
                nextEndGame();
                break;
            case (secondSceneNum+1):
                animateDiv();
                $('#raindropDIV').hide(0);
                $('#raindropGame').hide(0);
                $('#beginningPage').show(0);
//                document.getElementById("beginningPage").style.backgroundImage = 'url("./images/testBack.jpeg")';
                $("#text1").html("Employee: " + "<br/>" + lines2[0]);
                break;
            case 102:
                $("#text1").html("Employee: " + "<br/>" + lines2[1]);
                break;
            case 103:
                $("#text1").html("???: " + "<br/>" + lines2[2]);
                break;
            case 104:
                $("#text1").html("???: " + "<br/>" + lines2[3]);
                break;
            case 105:
                $("#text1").html(userName + ":" + "<br/>" + lines2[4]);
                break;
            case 106:
                $("#text1").html("Richard: " + "<br/>" + lines2[5]);
                break;
            case 107:
                $("#text1").html("Employee: " + "<br/>" + lines2[6]);
                break;
            case 108:
                $("#text1").html("Richard: " + "<br/>" + lines2[7]);
                break;
            case 109:
                $("#text1").html("Richard: " + "<br/>" + lines2[8]);
                break;
            case 110:
                $("#text1").html("Richard: " + "<br/>" + lines2[9]);
                break;
            case 111:
                $("#text1").html(userName + ":" + "<br/>" + lines2[10]);
                break;
            case 112:
               $("#text1").html("Richard: " + "<br/>" + lines2[11]);
                break;
            case 113:
               $("#text1").html("Employee: " + "<br/>" + lines2[12]);
                break; 
            case 114:
                $("#text1").html(userName + ":" + "<br/>" + lines2[13]);
                break;
            case 115:
                $("#text1").html(userName + ":" + "<br/>" + lines2[14]);
                break;
            case 116:
                $("#text1").html(userName + ":" + "<br/>" + lines2[15]);
                break;
            case 117:
                $("#text1").html(userName + ":" + "<br/>" + lines2[16]);
                break;
            case 118:
                $("#text1").html("Employee: " + "<br/>" + lines2[17]);
                break;
            case 119:
                $("#text1").html("Employee: " + "<br/>" + lines2[18]);
                break;
            case 120:
                $("#text1").html(userName + ":" + "<br/>" + lines2[19]);
                break;
            case 121:
                animateDiv();
                $("#text1").html("As -hotel employee’s name here- walks through the garden, he notices that the sprinklers are  on and a lady washing the pavilion with a hose.");
                break;
            case 122:
                $("#text1").html("Employee: " + "<br/>" + lines2[20]);
                break;
            case 123:
                $("#text1").html("Employee: " + "<br/>" + lines2[21]);
                break;
            case 124:
                $("#text1").html("Gradener: " + "<br/>" + lines2[22]);
                break;
            case 125:
                $("#text1").html("Jenny: " + "<br/>" + lines2[23]);
                break;
            case 126:
                $("#text1").html("Employee: " + "<br/>" + lines2[24]);
                break;
            case 127:
                $("#text1").html("Jenny: " + "<br/>" + lines2[25]);
                break;
            case 128:
                $("#text1").html("Employee: " + "<br/>" + lines2[26]);
                break;
            case 129:
                $("#text1").html("Employee: " + "<br/>" + lines2[27]);
                break;
            case 130:
                $("#text1").html("Jenny: " + "<br/>" + lines2[28]);
                break;
            case 131:
                $("#text1").html("Employee: " + "<br/>" + lines2[29]);
                break;
            case 132:
                $("#text1").html("Jenny: " + "<br/>" + lines2[30]);
                break;
            case 133:
                $("#text1").html("Jenny: " + "<br/>" + lines2[31]);
                break;
            case 134:
                $("#text1").html("Employee: " + "<br/>" + lines2[32]);
                break;
            case 135:
                $("#text1").html("Jenny: " + "<br/>" + lines2[33]);
                break;
            case 136:
                $("#text1").html("Employee: " + "<br/>" + lines2[34]);
                break;
            case 137:
                $("#text1").html("Jenny: " + "<br/>" + lines2[35]);
                break;
            case 138:
                $("#text1").html("Employee: " + "<br/>" + lines2[36]);
                break;
            case 139:
                $("#text1").html("Jenny: " + "<br/>" + lines2[37]);
                break;
            case 140:
                $("#text1").html("Employee: " + "<br/>" + lines2[38]);
                break;
            case 141:
                $("#text1").html("Jenny: " + "<br/>" + lines2[39]);
                break;
            case 142:
                $("#text1").html("Jenny: " + "<br/>" + lines2[40]);
                break;
            case 143:
                $("#text1").html("Employee: " + "<br/>" + lines2[41]);
                break;
            case 144:
                $("#text1").html("Employee: " + "<br/>" + lines2[42]);
                break;
            case 145:
                $("#text1").html("Employee: " + "<br/>" + lines2[43]);
                break;
            case 146:
                $("#text1").html("Employee: " + "<br/>" + lines2[44]);
                break;
            case 147:
                $("#text1").html("Jenny: " + "<br/>" + lines2[45]);
                break;
            case 148:
                $("#text1").html("Employee: " + "<br/>" + lines2[46]);
                break;
            case 149:
                $("#text1").html("Employee: " + "<br/>" + lines2[47]);
                break;
            case 150:
                animateDiv();
                $("#text1").html(userName + ":" + "<br/>" + lines2[48]);
                break;
            case 151:
                $("#text1").html(userName + ":" + "<br/>" + lines2[49]);
                break;
            case 152:
                $("#text1").html(lines2[50]);
                break;
            case 153:
                $("#text1").html(userName + ":" + "<br/>" + lines2[51]);
                break;
            case 154:
                $("#text1").html(userName + ":" + "<br/>" + lines2[52]);
                break;
            case 155:
                $("#next").hide(0);
                $('#overlay').animate({
                    opacity: 1,
                }, 1500, function () {
                });
                
                setTimeout(nextMinigame2, 1500);
                break;
            case 156:
                $("#text1").show(0);
                $("#text2").hide(0);
                nextEndGame2();
                break;
            case (thirdSceneNum+1):
                animateDiv();
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
                $('#beginningPage').show(0);
                $("#text1").html("???: " + "<br/>" + lines3[0]);
                break;
            case 202:
                $("#text1").html(userName + ":" + "<br/>" + lines3[1] + userName + ". " + lines3[2]);
                break;
            case 203:
                $("#text1").html("???: " + "<br/>" + lines3[3]);
                break;
            case 204:
                $("#text1").html("Kevin: " + "<br/>" + lines3[4]);
                break;
            case 205:
                $("#text1").html("Kevin: " + "<br/>" + lines3[5]);
                break;
            case 206:
                $("#text1").html(userName + ":" + "<br/>" + lines3[6]);
                break;
            case 207:
                $("#text1").html(userName + ":" + "<br/>" + lines3[7]);
                break;
            case 208:
                $("#text1").html("Kevin: " + "<br/>" + lines3[8]);
                break;
            case 209:
                $("#text1").html(userName + ":" + "<br/>" + lines3[9]);
                break;
            case 210:
                $("#text1").html("Kevin: " + "<br/>" + lines3[10]);
                break;
            case 211:
                $("#text1").html(userName + ":" + "<br/>" + lines3[11]);
                break;
            case 212:
                $("#text1").html(userName + ":" + "<br/>" + lines3[12]);
                break;
            case 213:
                $("#text1").html("Kevin: " + "<br/>" + lines3[13]);
                break;
            case 214:
                $("#text1").html(userName + ":" + "<br/>" + lines3[14]);
                break;
            case 215:
                $("#text1").html("Kevin: " + "<br/>" + lines3[15]);
                break;
            case 216:
                $("#text1").html(userName + ":" + "<br/>" + lines3[16]);
                break;
            case 217:
                $("#text1").html("Kevin: " + "<br/>" + lines3[17]);
                break;
            case 218:
                $("#text1").html(lines3[18]);
                break;
            case 219:
                $("#text1").html(userName + ":" + "<br/>" + lines3[19]);
                break;
            case 220:
                $("#text1").html("Kevin: " + "<br/>" + lines3[20]);
                break;
            case 221:
                $("#text1").html(userName + ":" + "<br/>" + lines3[21]);
                break;
            case 222:
                $("#text1").html("Kevin: " + "<br/>" + lines3[22]);
                break;
            case 223:
                $("#text1").html("Kevin: " + "<br/>" + lines3[23]);
                break;
            case 224:
                $("#text1").html(userName + ":" + "<br/>" + lines3[24]);
                break;
            case 225:
                $("#text1").html("Kevin: " + "<br/>" + lines3[25]);
                break;
            case 226:
                $("#text1").html("Kevin: " + "<br/>" + lines3[26]);
                break;
            case 227:
                $("#text1").html(userName + ":" + "<br/>" + lines3[27]);
                break;
            case 228:
                $("#text1").html("Kevin: " + "<br/>" + lines3[28]);
                break;
            case 229:
                $("#text1").html("Kevin: " + "<br/>" + lines3[29]);
                break;
            case 230:
                $("#text1").html(userName + ":" + "<br/>" + lines3[30]);
                break;
            case 231:
                $("#text1").html(userName + ":" + "<br/>" + lines3[31]);
                break;
            case 232:
                $("#text1").html("Kevin: " + "<br/>" + lines3[32]);
                break;
            case 233:
                animateDiv();
                $("#text1").html("Employee: " + "<br/>" + userName + " " + lines3[33]);
                break;
            case 234:
                $("#text1").html(userName + ":" + "<br/>" + lines3[34]);
                break;
            case 235:
                $("#text1").html("Employee: " + "<br/>" + lines3[35]);
                break;
            case 236:
                $("#text1").html("Richard: " + "<br/>" + lines3[36]);
                break;
            case 237:
                $("#text1").html("Employee: " + "<br/>" + lines3[37]);
                break;
            case 238:
                $("#text1").html(userName + ":" + "<br/>" + lines3[38]);
                break;
            case 239:
                $("#text1").html("Employee: " + "<br/>" + lines3[39]);
                break;
            case 240:
                $("#text1").html(userName + ":" + "<br/>" + lines3[40]);
                break;
            case 241:
                $("#text1").html(userName + ":" + "<br/>" + lines3[41]);
                break;
            case 242:
                $("#text1").html(userName + ":" + "<br/>" + lines3[42]);
                break;
            case 1000:
                animateDiv();
                $('#raindropDIV').hide(0);
                $('#raindropGame').hide(0);
                $('#beginningPage').show(0);
                $("#text1").html("Employee: " + "<br/>Although we could not collect all the drops, we fixed the pipes. Everything would be all good for now.");
                textNum = secondSceneNum + 1;
                break;
            case 2000:
                animateDiv();
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
                $('#beginningPage').show(0);
                $("#text1").html("failtest");
                textNum = thirdSceneNum;
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
    updateTapPage();
    startTimer();
    $('#overlay').animate({
        opacity: 0,
    }, 1000, function () {
    });
    $("#text1").html("Turn off randomly turned on unused taps to conserve water.");
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
