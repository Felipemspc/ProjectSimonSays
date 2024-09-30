let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 1;

$(document).on('keydown click', function(event) {
  if (!started && !$(event.target).hasClass('btn')) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  if (started) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Click Anywhere to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);

  // Repetir a sequência atual
  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function() {
      $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
    }, 500 * i); // adcionando um intervalo para cada aparecimento de uma nova cor
  }

  // Adcionando uma nova cor após iniciar a funcao nextseguence()
  setTimeout(function() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }, 500 * gamePattern.length); // Esperando a nextSequence() terminar antes de adcionar uma nova cor

  level++;
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 1;
  gamePattern = [];
  started = false;
}
