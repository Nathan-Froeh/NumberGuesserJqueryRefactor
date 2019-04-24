
//********BEGIN GLOBAL VARIABLES*******

$(document).ready(() => {
var randomNum;
var finishedGames = document.querySelector('.finished-games');
//********BEGIN EVENT LISTENERS**********

$('.button--clear-game').on('click', clear);
$('.input--p1-name').on('keyup', checkClearDisabled);
$('.input--p2-name').on('keyup', checkClearDisabled);  
$('.input--p1-guess').on('keyup', checkClearDisabled);
$('.input--p2-guess').on('keyup', checkClearDisabled);

$('.button--reset-game').on('click', reset); 
$('.input--p1-name').on('keyup', checkResetDisabled);
$('.input--p2-name').on('keyup', checkResetDisabled);  
$('.input--p1-guess').on('keyup', checkResetDisabled);
$('.input--p2-guess').on('keyup', checkResetDisabled);
$('.input--min-range').on('keyup', checkResetDisabled);
$('.input--max-range').on('keyup', checkResetDisabled);

//********BEGIN FUNCTIONS********


$('.button--update-range').on('click', () => {
	var min = parseInt($('.input--min-range').val());
	var max = parseInt($('.input--max-range').val());
	if (min >= max) {
		alert('Min & Max Range Conflict');
	} else if (isNaN(min) || isNaN(max)) {
		alert('Min & Max Range Conflict');
	} else {getRandom()};
})



//Input range error conditions

//Random number generator

function getRandom() {
	var min = Math.ceil(parseInt($('.input--min-range').val()));
 	var max = Math.floor(parseInt($('.input--max-range').val()));
 	randomNum = Math.floor(Math.random() * (max - min)) + min;
 	$('.min-number').text(min);
 	$('.max-number').text(max);
 	console.log('randomNum' + randomNum);
 	return randomNum;
};

//Establish local variables

$('.button--submit-guess').on('click', () => {
	var min = parseInt($('.input--min-range').val());
	var max = parseInt($('.input--max-range').val());
	var g1 = parseInt($('.input--p1-guess').val());
	var g2 = parseInt($('.input--p2-guess').val());
	var p1 = $('.input--p1-name').val();
	var p2 = $('.input--p2-name').val();
	nameError(min, max, g1, g2, p1, p2)
})


//Name and guess error conditions

function nameError(min, max, g1, g2, p1, p2) {
	if ($('.input--p1-name').val() === '' || $('.input--p2-name').val() === '') {
		alert('Player Name Missing');
	} else {
		minError(min, max, g1, g2, p1, p2);
	};
};

function minError(min, max, g1, g2, p1, p2) {
	if (min > g1) {
		alert('Player 1 Guess Below Range');
	} else if(min > g2) {
		alert('Player 2 Guess Below Range');
	} else if(isNaN(g1) || isNaN(g2)) {
		alert('Player Guess Missing');
	} else {
		maxError(min, max, g1, g2, p1, p2);
	};
};

function maxError(min, max, g1, g2, p1, p2) {
	if (max < g1) {
		alert('Player 1 Guess Over Range');
	} else if (max < g2) {
		alert('Player 2 Guess Over Range');
	} else {
		nameHandler(min, max, g1, g2, p1, p2);
		p1Guess(min, max, g1, g2, p1, p2);
		p2Guess(min, max, g1, g2, p1, p2);
	};
};

//Populates player name and guess

function nameHandler(min, max, g1, g2, p1, p2) {
	$('.output--p1-name').text(p1);
	$('.output--p2-name').text(p2);
	$('.output--p1-guess').text(g1);
	$('.output--p2-guess').text(g2);
};

//Determins game winner

function p1Guess(min, max, g1, g2, p1, p2) {
	if (g1 < randomNum) {
		$('.p1-hi-lo').text('That\'s too low');
	} else if (g1 > randomNum) {
		$('.p1-hi-lo').text('That\'s too high');
	} else if (g1 == randomNum) {
		$('.p1-hi-lo').text('BOOM!');
		w1 = p1;
		winnerStatement(min, max, g1, g2, p1, p2, w1);
	};
};

function p2Guess(min, max, g1, g2, p1, p2, w1) {
	if (g2 < randomNum) {
		$('.p2-hi-lo').text('That\'s too low');
	} else if (g2 > randomNum) {
		$('.p2-hi-lo').text('That\'s too high');
	} else if (g2 == randomNum) {
		$('.p2-hi-lo').text('BOOM!');
	 	w2 = p2;
	 	winnerStatement(min, max, g1, g2, p1, p2, w1, w2);
	};
};

function winnerStatement(min, max, g1, g2, p1, p2, w1, w2) {
	var winner;
	if ((w1 === p1) && (w2 === p2)) {
		winner = 'It\'s a Tie';
		alert('BOOM!');
		winReset(p1, p2, winner);
	} else if(w1 === p1) {
		winner = p1;
		alert('BOOM!');
		winReset(p1, p2, winner);
	} else if(w2 === p2) {
		winner = p2;
		alert('BOOM!');
		winReset(p1, p2, winner);
	};
};

function winReset(p1, p2, winner) {
	genCard(p1, p2, winner);
};

//Clear button disable functions

function checkClearDisabled() {
	if ($('.button--clear-game').is(':disabled') === true) {
		clearDisable();
	};
};

function clearDisable() { 
	if ($('.input--p1-name').val() === '' &&
		$('.input--p2-name').val() === '' &&
		$('.input--p1-guess').val() === '' &&  
		$('.input--p2-guess').val() === '') {
		$('.button--clear-game').prop('disabled', true);
	} else {
		$('.button--clear-game').prop('disabled', false);
	};
};

function clear() {
	$('.output--p1-name').text('Challenger 1');
	$('.output--p2-name').text('Challenger 2');
	$('.output--p1-guess').text('#');
	$('.output--p2-guess').text('#');
	$('.p1-hi-lo').text('');
	$('.p2-hi-lo').text('');
	$('.input--p1-name').val('');
	$('.input--p2-name').val('');
	$('.input--p1-guess').val('');
	$('.input--p2-guess').val('');
};

//Reset button disable functions

function checkResetDisabled() {
	if ($('.button--reset-game').is(':disabled') === true) {
		resetDisable();
	};
};

function resetDisable() { 
	if ($('.input--p1-name').val() === '' &&
		$('.input--p2-name').val() === '' &&
		$('.input--p1-guess').val() === '' &&  
		$('.input--p2-guess').val() === '' &&
		$('.input--min-range').val() === '' &&
		$('.input--max-range').val() === '') {
		$('.button--reset-game').prop('disabled', true);
	} else {
		$('.button--reset-game').prop('disabled', false);
	};
};

function reset() {
	$('.input--min-range').val('1');
	$('.input--max-range').val('100');
	getRandom();
	clear();
};

//Creates the winner card

function genCard(p1, p2, winner) {
	var winnerBox = `
	<div class="winner-box">
          <div class="contestant-names">
            <span class="output--p1-name">${p1}</span>
            <p>VS</p>
            <span class="output--p2-name">${p2}</span>
          </div>
          <div class="winner">
            <span class="winner-name">${winner}</span>
            <p class="winner-tag">WINNER</p>
          </div>
          <div class="game-stats">
            <p><span class="guess-count">47</span> GUESSES</p>
            <p><span class="game-timer">1.35</span> MINUTES</p>
            <img src="close-button.png" alt="Close button" class="close-button"/>
          </div>
        </div>
          `
  finishedGames.insertAdjacentHTML('afterBegin', winnerBox);
};

});
//*********** NO CODE BELOW THIS LINE********

//Notes!!

//make minError and maxerror dynamic
// create a new function 
// pass in arguments

// refactor p1 and p2 guess into one function 
// a function that determines the player
// invoke guess function by passing in that player
// invoke guess function for the other player

// add a new class in css to everything you want to clear with the clear and reset function
// query select all = array
// create a function with a for loop to iterate through that array and reset evryone to ''
// pass in the query selected array
// var arr = [1,2,3,4,5,6,7]
// for(var i = 0; i < arr.length; i++){
// 	arr[0]
// }










