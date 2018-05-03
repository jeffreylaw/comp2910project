function hiclick() {
    document.getElementById("startButton").addEventListener("click", blackout);
}

function removeElements() {
    window.location.href = "../transition/transitionPage.html";
}

function blackout(){
     $('#overlay').animate({
       opacity: 1,
     }, 1500, function() {
        
     });
    setTimeout(removeElements, 1500);
}
