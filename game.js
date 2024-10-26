// Game variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

// Start/Restart button functionality
$("#start-restart-btn").click(function() {
  if (!gameStarted) {
    startGame();
  } else {
    restartGame();
  }
});

// Start game function
function startGame() {
  gameStarted = true;
  level = 0;
  gamePattern = [];
  $("#start-restart-btn").text("Restart Game");  // Change button text
  $("#level-title").text("Level " + level);
  nextSequence();
}

// Restart game function
function restartGame() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  nextSequence();
}

// Generates the next color in the sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  // Select a random color and add it to the game pattern
  var randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  // Flash the button for the chosen color
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sound for the chosen color
  playSound(randomChosenColor);
}

// Handles user button clicks
$(".btn").click(function() {
  if (gameStarted) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // Play sound and animate the clicked button
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // Check the user's answer
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Checks the user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the user has matched the full sequence, generate the next color
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Game over sequence
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    gameStarted = false;
    $("#start-restart-btn").text("Restart Game");  // Change button text to "Restart Game"
  }
}

// Plays sound for the corresponding color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animates button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
