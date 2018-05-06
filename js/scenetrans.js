function clickedPlay() {
    $('#overlay').animate({
        opacity: 1,
      }, 1500, function() {
         
      });
     setTimeout(transitionPage, 1500);
}

function transitionPage() {
    window.location.href = "./html/transitionPage.html";
}





/* function blackout(){
     $('#overlay').animate({
       opacity: 1,
     }, 1500, function() {
        
     });
    setTimeout(removeElements, 1500);
} */
