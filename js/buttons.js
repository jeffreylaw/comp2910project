function initializeButtons() {
    var nextButton = document.getElementById("next");
    console.log(nextButton);
    
    nextButton.addEventListener("click", nextClick, false);

    function nextClick() {
        pageOpen = true;
        startGame();
        alert("next button clicked");
    }
    
}

