var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; 
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(startGame);
$("#start").click(startGame);
function startGame(){
    if(!started){
        $("#level-title").text("Level " + level);
        $("#start").css("visibility", "hidden");
        nextSequence();
        started = true;
    }
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("correct");
        if(gamePattern.length===userClickedPattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("game-over, press any key to restart");
        startOver();
    }
}
function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
    $("#start").css("visibility", "visible");
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(chosenColour){
    $("#" + chosenColour).addClass("pressed");
    setTimeout(function(){
        $("#" + chosenColour).removeClass("pressed")
    },100);
}