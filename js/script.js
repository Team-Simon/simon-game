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
  var colorButtonsDisabled = true

  $("#strict-button").click(function() {
  	console.log("deviceOn: " + deviceOn + " gameOn: " + gameOn + " strictMode: " + strictMode);
  	if (deviceOn && gameOn) {
  		if (strictMode) {
  			strictMode = false;
  			$("#strict-LED").css("background-color","black");
  		} else {
				strictMode = true;
  			$("#strict-LED").css("background-color","red");
  		}
  	}
  });

  $("#on-off-button").click(function() {
  	if (deviceOn) {
  		turnDeviceOff();
  	} else {
  		turnDeviceOn();
  	}
  });

  $(".color-button").mousedown(function() {
  	if (deviceOn && gameOn && !colorButtonsDisabled){
  		console.log("clicked on " + $(this)[0].id)
  		
	// b. Compare button y to button at current index in button history array
			console.log("button id: " + $(this)[0].id + " buttonHistory[currentIndex]: " + buttonHistory[currentIndex])
			if ($(this)[0].id == buttonHistory[currentIndex]){
				animateSingleButton($(this)[0].id);
				if (currentIndex < buttonHistory.length - 1) {
					currentIndex++;
				} else {
					colorButtonsDisabled = true;
					setTimeout(function(){computerTurn()},2000);
				}
			} else {
					if (strictMode) {
						$("#count-box").html = "!!";
						colorButtonsDisabled = true;
						setTimeout(function(){restartGame()},2000);
					} else {
						colorButtonsDisabled = true;
						setTimeout(function(){replay()},2000);
					}
				}
	// c. If equal and current index < length of button history array: i. Increment current index
	// ii. Wait for user to click on any button
	// d. If equal and current index = length of button history array
	// i. Computer’s Turn (call computer_turn function)
	// e. If not equal
	// i. If strict (check color of LED using jquery)
	// 1. Indicate in count-box wrong click
	// 2. Restart Game
	// ii. If not strict
	// 1. Set current index = 0
	// 2. Animate Button History Array
	// 3. Wait for user to click on any button
  	}
  });
  function replay() {
  	// d. Set current index = 0
		currentIndex = 0;
		// e. Disable color buttons
		colorButtonsDisabled = true;
		// f. Animate button history array (including sounds)
		animateButtonHistory();
		// g. Enable color buttons
		colorButtonsDisabled = false;
		// h. Wait for user to click on any button
		//(don’t need to call anything since jquery handlers are listening)
  }

  $("#start-button").click(function(){
  	if (deviceOn) {
  		restartGame();
  	}
  });

  function restartGame() {
  	// 0. Turn game on
  	gameOn = true;
		// a. Set count = 0
		count = 0;
		// b. Count-box set to zero
		$("#count-box").html(count);
		// c. Button history array is empty
		buttonHistory = [];
		// d. Start game engine (Computer Turn)
		computerTurn();
  }

  function turnDeviceOn() {
  	gameOn = false;
  	deviceOn = true;
  }

  function turnDeviceOff() {
		// a. Set game_on variable to false
		gameOn = false;
		deviceOn = false;
		// b. Strict-LED set off
		$("#strict-LED").css("background-color","black");
		// c. Count set to “”
		$("#count-box").html("");
		// d. count set to 0
		count = 0;
		buttonHistory = [];
  }

  function computerTurn() {
  	// a. Increment count
  	count++;
  	$("#count-box").html(count);
		// b. Randomly generate button x: Function that randomly generates a button (Math.random 0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1 => a,b,c,d)
		var nextButton = randomButton();
		// c. Append button x to button history array
		buttonHistory.push(nextButton);
		// d. Set current index = 0
		currentIndex = 0;
		// e. Disable color buttons
		colorButtonsDisabled = true;
		// f. Animate button history array (including sounds)
		//animateButtonHistory();
		animateButtonChain(0);
		// g. Enable color buttons
		colorButtonsDisabled = false;
		// h. Wait for user to click on any button
		//(don’t need to call anything since jquery handlers are listening)
  }

  function animateButtonHistoryNoEval() {
		// a. Set loop index = 0
		var loopIndex = 0;
		// b. While current index < length of button history array AND game_on (is true)
		while ((loopIndex < buttonHistory.length) && gameOn && deviceOn){
			console.log(buttonHistory[loopIndex])
			//evalString = evalString + "setTimeout(function(){animateSingleButton('" + buttonHistory[loopIndex] + "')}, " + loopIndex * 2000 + ");"

			// This doesn't work:
		 	setTimeout(function() {
		 		console.log(buttonHistory[loopIndex])
		 		animateSingleButton.bind(buttonHistory[loopIndex]);
		 	}, loopIndex*2000);

			loopIndex++;
		}
  }

  function animateButtonHistoryEval() {
		// a. Set loop index = 0
		var loopIndex = 0;
		var evalString = "";
		// b. While current index < length of button history array AND game_on (is true)
		while ((loopIndex < buttonHistory.length) && gameOn && deviceOn){
			console.log(buttonHistory[loopIndex])
			evalString = evalString + "setTimeout(function(){animateSingleButton('" + buttonHistory[loopIndex] + "')}, " + loopIndex * 2000 + ");
			loopIndex++;
		}
		//console.log(evalString);
		eval(evalString);
  }

  function animateSingleButton(b) {
  	console.log("animate single button: buttonID = " + b);
  	playSound(b);
		// Change button x color to lighter color of button x’s normal color
		$("#" + b).css("opacity","0.5");
		setTimeout(function(){$("#" + b).css("opacity","1")}, 1000);

  }

  function animateButtonChain(loopIndex) {
  	if (loopIndex < buttonHistory.length) {
  		setTimeout(function(){animateSingleButton(buttonHistory[loopIndex]);},2000)
  		animateButtonChain(loopIndex+1);
  	}
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
  function colorButtonsDisabled(bool) {
  	console.log("disabling buttons " + bool);
  	document.getElementById("red-button").disabled = true;
  	console.log(document.getElementById("red-button").disabled)
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
