$(document).ready(function(){
    $('#overlay').animate({
       opacity: 1,
     }, 0, function() {
    });
        $('#overlay').animate({
       opacity: 0,
     }, 1500, function() {
    });
    
    $("#text2").hide(0);
    $("#text3").hide(0);
    $("#text4").hide(0);
    $("#text5").hide(0);
    $("#next").click(function(){
        $("#text1").hide(0);
        $("#next").hide(0);
        $("#text2").show(0);
    })
    $("#next2").click(function(){
        $("#text2").hide(0);
        $("#next2").hide(0);
        $("#text3").show(0);
    })
    $("#next3").click(function(){
        document.getElementById("divID").style.backgroundImage = 'url("testBack.jpeg")';
        $('#divID').animate({
        opacity: 0,
        }, 0, function() {
        });
        $('#divID').animate({
        opacity: 1,
        }, 1000, function() {
        });
        $("#text3").hide(0);
        $("#next3").hide(0);
        $("#text4").show(0);
    })
    $("#next4").click(function(){
        $("#text4").hide(0);
        $("#next4").hide(0);
        $("#text5").show(0);
    })
    $("#next5").click(function(){
        $('#overlay').animate({
            opacity: 1,
        }, 1500, function() {
        });
        
        setTimeout(removeElements, 1500);
        
    })
})

function removeElements() {
    window.location.href = "../minigame1/html/raindrop.html";
}
