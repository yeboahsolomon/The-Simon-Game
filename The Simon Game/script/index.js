var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

function nextSequence() { 
  
 userClickedPattern = [];

 var randomNumber = Math.floor(Math.random() * 4);

 var randomChosenColour = buttonColours[randomNumber];

 gamePattern.push(randomChosenColour);

 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

 playSound(randomChosenColour);

 level++;

 $("#level-title").text("Level " + level);

};

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function playSound(name){

 var audio = new Audio("sounds/" + name + ".mp3");
 audio.play();

};

function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed")
  }, 100);

};

var started = false;

var level = 0;

$(document).keypress(function(){

  if (!started){
    nextSequence();
    started = true;
    $("#level-title").text("Level " + level);
  };

});

function checkAnswer(currentLevel){

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      
      setTimeout(function(){
        nextSequence();
      }, 1000);

    };

  }  else {

    var audio = new Audio("sounds/" + "wrong" + ".mp3");
    audio.play();

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over! Press Any Key to Restart.");

    startOver();

  };

};

function startOver(){
  level = 0;

  gamePattern = [];

  started = false;
};

//Simon Game, Coded by Yeboah-Solomon!!
