// var tiles = ["green", "red", "blue", "yellow"]
// var level = 0;
// var randomTile = [];
// var selectedTile = [];
// var gameProgress = false;
//
// $(document).keydown(function() {
//
//   if (!gameProgress) {
//     gameProgress = true;
//
//     nextSequence();
//   }
//
// });
//
// $(".btn").click(function() {
//
//   if (gameProgress) {
//     selectedTile.push(this.id);
//     // $("#" + this.id).fadeOut(250).fadeIn(250);
//     $("#" + this.id).addClass("pressed");
//     playSound(this.id);
//
//     // var test1 = selectedTile[selectedTile.length-1];
//
//     setTimeout(function() {
//       $("#" + selectedTile[selectedTile.length - 1]).removeClass("pressed");
//     }, 1000);
//     // if (selectedTile.length === randomTile.length) {
//     //
//     //   if (selectedTile[selectedTile.length - 1] === randomTile[randomTile.length - 1]) {
//     //     setTimeout(function() {
//     //       level++;
//     //       $("h1").html("Level " + level);
//     //       nextSequence();
//     //     }, 1000);
//     //   } else {
//     //     gameOver();
//     //   }
//     //
//     //
//     // } else {
//     //   console.log("No")
//     // }
//     if (selectedTile.length === randomTile.length) {
//       setTimeout(function() {
//         selectedTile = [];
//         nextSequence();
//       }, 1000);
//
//     } else {
//       // gameOver();
//       $("#" + selectedTile[selectedTile.length - 1]).removeClass("pressed");
//       // console.log("Wrong")
//       checkAnswer(selectedTile[selectedTile.length - 1]);
//     }
//
//   } else {
//     $("h1").html("Press A Key to Start");
//   }
//
// });
//
// function nextSequence() {
//   level++;
//   $("h1").html("Level " + level);
//   var randomNumber = Math.floor(Math.random() * 4);
//   randomTile.push(tiles[randomNumber]);
//
//   // var test = randomTile[randomTile.length - 1];
//   $("#" + randomTile[randomTile.length - 1]).fadeOut().fadeIn();
//   playSound(tiles[randomNumber]);
//
//   // for (var i = 0; i < randomTile.length; i++) {
//   //   // $("#" + randomTile[i]).fadeOut().fadeIn();
//   //   // playSound(randomTile[i]);
//   //   // $("#" + randomTile[randomTile.length - 1]).fadeOut(250).fadeIn(250);
//   //   playSound(tiles[randomNumber]);
//   //   test.push(randomTile[i]);
//   //     $("#" + randomTile[i]).fadeOut(250).fadeIn(250);
//   //   console.log(test);
//   // }
//
//
//
// }
//
// function playSound(name) {
//   var sound = new Audio("sounds/" + name + ".mp3")
//   sound.play();
// }
//
// function checkAnswer(currentLevel) {
//   // for (var i = 0; i < randomTile.length; i++) {
//   //   for (var j = 0; j < selectedTile.length; j++) {
//   //     console.log("randomTile " + randomTile[i] + " and selectedTile " + selectedTile[j]);
//   //     if(randomTile[i] === selectedTile[j]){
//   //       console.log("Test");
//   //       // nextSequence();
//   //     } else {
//   //       // gameOver();
//   //       console.log("Game over");
//   //     }
//   //   }
//   //
//   // }
//
//   if (selectedTile[currentLevel] === randomTile[currentLevel]) {
//     console.log("Success");
//   } else {
//     console.log("Wrong");
//   }
// }
//
// function gameOver() {
//   $("h1").html("Gameover. Press A Key to Start Again");
//   level = 0;
//   randomTile = [];
//   selectedTile = [];
//   playSound("wrong");
//   gameProgress = false;
// }

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
