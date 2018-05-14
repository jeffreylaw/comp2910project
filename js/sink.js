var background;
var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
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

function blackout() {
    $('#overlay').animate({
        opacity: 1,
    }, 1500, function () {

    });
    setTimeout(1500);
}



function updatePage() {
    var text = document.getElementsByTagName("p");
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

    for (let i = 0; i < text.length; i++) {
        if (width > height) {
            text[i].style.fontSize = height * 0.04 + "px";
        } else {
            text[i].style.fontSize = width * 0.04 + "px";
        }
    }

    setTimeout(updatePage, 10);
}


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
                $("#tap1").attr("src", "../images/faucetFrame2.png");
                break;
            }
        case 1:
            if (faucet2On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet2On = true;
                $("#tap2").attr("src", "../images/faucetFrame2.png");
                break;
            }
        case 2:
            if (faucet3On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet3On = true;
                $("#tap3").attr("src", "../images/faucetFrame2.png");
                break;
            }
        case 3:
            if (faucet4On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet4On = true;
                $("#tap4").attr("src", "../images/faucetFrame2.png");
                break;
            }
        case 4:
            if (faucet5On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucetOn = true;
                faucet5On = true;
                $("#tap5").attr("src", "../images/faucetFrame2.png");
                break;
            }
        case 5:
            if (faucet6On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet6On = true;
                faucetOn = true;
                $("#tap6").attr("src", "../images/faucetFrame2.png");
                break;
            }
        case 6:
            if (faucet7On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet7On = true;
                faucetOn = true;
                $("#tap7").attr("src", "../images/faucetFrame2.png");
                break;
            }

        case 7:
            if (faucet8On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet8On = true;
                faucetOn = true;
                $("#tap8").attr("src", "../images/faucetFrame2.png");
                break;
            }

        case 8:
            if (faucet9On == true) {
                //console.log("Ok carry it thorugh");
            } else {
                faucet9On = true;
                faucetOn = true;
                $("#tap9").attr("src", "../images/faucetFrame2.png");
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
                faucets[i].setAttribute("src", "../images/faucetFrame2.png");
            }
            break;
    }
    if (timer <= 1 || sinkFill >= 300) {
        return;
    }
    var rand = Math.floor(Math.random() * (1500 - 500)) + 500;
    setTimeout(updateRandomFaucet, rand);
}


$(document).ready(function () {
    $("#tap1").click(function () {
        //console.log("clciked??");
        faucetOn = false;
        faucet1On = false;
        $("#tap1").attr("src", "../images/faucet.png");
    });

    $("#tap2").click(function () {
        faucetOn = false;
        faucet2On = false;
        $("#tap2").attr("src", "../images/faucet.png");
    });

    $("#tap3").click(function () {
        faucetOn = false;
        faucet3On = false;
        $("#tap3").attr("src", "../images/faucet.png");
    });

    $("#tap4").click(function () {
        faucetOn = false;
        faucet4On = false;
        $("#tap4").attr("src", "../images/faucet.png");
    });

    $("#tap5").click(function () {
        faucetOn = false;
        faucet5On = false;
        $("#tap5").attr("src", "../images/faucet.png");
    });

    $("#tap6").click(function () {
        faucetOn = false;
        faucet6On = false;
        $("#tap6").attr("src", "../images/faucet.png");
    });
    $("#tap7").click(function () {
        faucetOn = false;
        faucet7On = false;
        $("#tap7").attr("src", "../images/faucet.png");
    });
    $("#tap8").click(function () {
        faucetOn = false;
        faucet8On = false;
        $("#tap8").attr("src", "../images/faucet.png");
    });
    $("#tap9").click(function () {
        faucetOn = false;
        faucet9On = false;
        $("#tap9").attr("src", "../images/faucet.png");
    });
});


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


        if (timer <= 1) {
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

        if (gameOver == true || timer <= 1) {
            $("#timer").html("Time: 0");
            gameOver = true;
            clearInterval(timer);
            return;
        }
        console.log(timer);
    }, 1000);
}


startSinkFill();
updatePage();
updateRandomFaucet();
startTimer();