/* ==================
VARIABLE DECLARATIONS
====================*/
var buttonColors = ["red", "blue", "green","yellow"]; 
var gamePattern = [];
var userClickedPattern= [];
var started = false; // A boolean flag determing if the game has started or not. 
var level = 0;


/* ===============
  EVENT LISTENERS
=================*/
$(document).keypress(startGame); // For mouse users
$(document).on("touchstart", startGame); // For touchscreen users

/* ===============
BUTTON CLICK EVENT
=================*/
$(".btn").click(function() {
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

/* =================
 START GAME FUNCTION
===================*/
function startGame() {
    if (!started) {
        level = 0;
        gamePattern = [];
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}

    /* ===============
        NEXT BUTTON 
    SEQUENCE FUNCTION
    =================*/
    function nextSequence() {
        userClickedPattern = [];
        level++;

        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);

        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }

        /* ===============
        SOUND FUNCTION
        =================*/
        function playSound(name) {
            var audio = new Audio("sounds/" + name + ".mp3");
            audio.play();
        }

        /* ===============
        'BUTTON CLICK' 
            ANIMATION
        =================*/
        function animatePress(currentColor) {
            $("#"+ currentColor).addClass("pressed");
            setTimeout(function () {
                $("#" + currentColor).removeClass("pressed");
            }, 100);
        }

        /* ================
        CHECK USER'S ANSWER
        ==================*/
        function checkAnswer (currentLevel) {
            if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) { // If user guessed correctly. 
                console.log("success")
                if (userClickedPattern.length === gamePattern.length){
                    setTimeout(function () {
                    nextSequence();
                    }, 1000);
                } 
            }

            else { // If user guessed incorrectly. 
                console.log("wrong")
                playSound("wrong");
                $("body").addClass("game-over");
                $("#level-title").text("Game Over! Press Any Key to Restart");

                setTimeout(function () {
                    $("body").removeClass("game-over");
                }, 200);
                started = false;
            }
        }



