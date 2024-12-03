var buttonColor=["red" , "green" ,"blue" ,"yellow"]
var userClickedPattern=[]
var gamePattern=[]
var level=0
var start=false;

function nextSequence(){
    level++;
    $(".title").text("level  "+level);
    var randomNumber=Math.floor(Math.random()*4)
    var randomChosenColour=buttonColor[randomNumber]
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}
$(document).keypress(function(){
    if(!start){
        $(".title").text("level  "+level)
        nextSequence();
        start=true;
      
    }
    
    

})

$(".btn").click(function(){
   var  userChosenColour = $(this).attr("id");
   userClickedPattern.push( userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1)


})
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#" + currentColour ).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed"); 
    }, 100);
}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $(".title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function startOver(){
    level=0;
    start=false;
    gamePatter=[]
}