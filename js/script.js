$(document).ready(function() {
  //Boolean used to check if the game should continue
  var gameOn = false;
  //Ids of the buttons in the game
  const buttons = ['#red-button', '#yellow-button', '#blue-button', '#green-button'];
  //Array that stores the button sequence that has been randomly generated throughout the game
  var buttonHistory = [];
  //Index corresponding to the user's position in the button sequence
  var currentIndex = 0;
  //Counter to display length of buttonHistory (probably not be needed)
  var count = 0;

  $(".on-off-button").click(function() {
  	console.log("Game On!");
  });

  $(".color-button").click(function() {
  	console.log($(this)[0].id);
  });

  function computerTurn() {
  	// a. Increment count
  	count++;
		// b. Randomly generate button x: Function that randomly generates a button (Math.random 0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1 => a,b,c,d)
		var nextButton = randomButton();
		// c. Append button x to button history array
		buttonHistory.append(nextButton);
		// d. Set current index = 0
		currentIndex = 0;
		// e. Disable color buttons
		colorButtonsDisabled(true);
		// f. Animate button history array (including sounds)
		animateButtonHistory(buttonHistory);
		// g. Enable color buttons
		colorButtonsDisabled(false);
		// h. Wait for user to click on any button
		//(don’t need to call anything since jquery handlers are listening)
  }

  function animateButtonHistory(buttonHistoryParam) {
		// a. Set Current index = 0
		// b. While current index < length of button history array AND game_on (is true)
		// i. Call Animate_Single_Button(button_history_array[current index])
		// ii. Increment current index
  }

  function animateSingleButton(buttonID) {
		// Change button x color to lighter color of button x’s normal color
		// Play sound for button x (store sound urls in sound_array in same order as button names) for
		// a duration (window.setInterval(callback, duration_in_milliseconds) maybe)
		// Change button x color back to normal color
  }

  function colorButtonsDisabled(bool) {
  	$(".color-button").prop("disabled", bool); 
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
