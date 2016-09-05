$(document).ready(function() {
  var gameOn = false;
  const buttons = ['.red-button', '.yellow-button', '.blue-button', '.green-button'];
  var buttonHistory = [];
  var currentIndex = 0;

  $(".on-off-button").click(function() {
  	console.log("Game On!");
  });

  $(".color-button").click(function() {
  	console.log($(this)[0].id);
  });

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
