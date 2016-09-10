$(document).ready(function() {
  //Boolean used to check if the game should continue
  var gameOn = false;
  //Ids of the buttons in the game
  const buttons = ['red-button', 'yellow-button', 'blue-button', 'green-button'];
  //Array that stores the button sequence that has been randomly generated throughout the game
  var buttonHistory = [];
  //Index corresponding to the user's position in the button sequence
  var currentIndex = 0;
  //Counter to display length of buttonHistory (probably not be needed)
  var count = 0;
  //Boolean used to check if the device is on
  var deviceOn = false;
  var strictMode = false;
  var colorButtonsDisabled = true;
  var timeouts = [];
  var speed = 1000;
  const baseSpeed = 1000;
  const lightSpeed = 750;

  function clearTimeoutsArray() {
    timeouts.map(clearTimeout);
		timeouts = [];
  }

  $("#strict-button").click(function() {
  	if (deviceOn) {
  		if (strictMode) {
  			strictMode = false;
  			$("#strict-LED").css("background-color","black");
  		} else {
				strictMode = true;
  			$("#strict-LED").css("background-color","red");
  		}
  	}
  });

  $("#on-off-slider").click(function() {
  	if (deviceOn) {
  		turnDeviceOff();
  	} else {
  		turnDeviceOn();
  	}
  });

  $(".color-button").mousedown(function() {
  	if (deviceOn && gameOn && !colorButtonsDisabled){
  		$(".color-button").css("opacity","1");
			if ($(this)[0].id == buttonHistory[currentIndex]){
				animateSingleButton($(this)[0].id,true);
				if (currentIndex < buttonHistory.length - 1) {
					currentIndex++;
				} else {
					colorButtonsDisabled = true;
					timeouts.push(setTimeout(function(){computerTurn()},speed));
				}
			} else {
				animateSingleButton($(this)[0].id,false);
				if (strictMode) {
					$("#count-box").html = "!!";
					colorButtonsDisabled = true;
					timeouts.push(setTimeout(function(){restartGame()},speed*1.5));
				} else {
					colorButtonsDisabled = true;
					timeouts.push(setTimeout(function(){replay()},speed*1.5));
				}
			}
  	}
  });

  function replay() {
		currentIndex = 0;
		colorButtonsDisabled = true;
		animateButtonChain(0);
  }

  $("#start-button").click(function(){
  	if (deviceOn) {
  		restartGame();
  	}
  });

  function restartGame() {
  	console.log("restarting game");
  	speed = baseSpeed;
  	clearTimeoutsArray();
  	gameOn = true;
		count = 0;
		$("#count-box").html(count);
		buttonHistory = [];
		computerTurn();
  }

  function turnDeviceOn() {
  	clearTimeoutsArray()
  	gameOn = false;
  	deviceOn = true;
  	$("#count-box").html(" -- ");
  }

  function turnDeviceOff() {
  	clearTimeoutsArray()
		gameOn = false;
		deviceOn = false;
		$("#strict-LED").css("background-color","black");
		$("#count-box").html("");
		count = 0;
		$(".color-button").css("opacity","1");
		buttonHistory = [];
  }

  function computerTurn() {
  	count++;
  	if (count > 5) {speed = lightSpeed;}
  	$("#count-box").html(count);
		var nextButton = randomButton();
		buttonHistory.push(nextButton);
		currentIndex = 0;
		colorButtonsDisabled = true;
		animateButtonChain(0);
  }

  function animateSingleButton(b,correctBool) {
  	if (gameOn) {
  		if (correctBool){
  			playSound(b);
  		} else {
  			playErrorSound();
  		}
			$("#" + b).css("opacity","0.5");
			timeouts.push(setTimeout(function(){$("#" + b).css("opacity","1")}, speed/2));
		}
  }

  function animateButtonChain(loopIndex) {
  	if (loopIndex < buttonHistory.length) {
  		timeouts.push(setTimeout(function(){animateSingleButton(buttonHistory[loopIndex],true);},speed*loopIndex));
  		animateButtonChain(loopIndex+1);
  	} else {
  		timeouts.push(setTimeout(function(){colorButtonsDisabled = false;},speed*(loopIndex-0.5)));
  	}
  }

  function playErrorSound() {
  	var buttonSound = new sound("sounds/fail.mp3")
  	buttonSound.play();
  }

  function playSound(buttonID) {
  //Play sound for button x (store sound urls in sound_array in same order as button names)
  //for a duration (window.setInterval(callback, duration_in_milliseconds) maybe)
  	const soundMap = {
  	"red-button": "sounds/redSound.mp3",
  	"yellow-button":"sounds/yellowSound.mp3",
  	"blue-button": "sounds/blueSound.mp3",
  	"green-button": "sounds/greenSound.mp3"};

  	var buttonSound = new sound(soundMap[buttonID])
  	buttonSound.play();
	}

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
	}
  function randomButton() {
  	return buttons[getRandomIntInclusive(0,3)];
  }
  // Returns a random integer between min (included) and max (included)
	// Using Math.round() will give you a non-uniform distribution!
  function getRandomIntInclusive(min, max) {
  	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min + 1)) + min;
	}
});
