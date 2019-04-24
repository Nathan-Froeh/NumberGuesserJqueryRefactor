
//********BEGIN GLOBAL VARIABLES*******

$(document).ready(() => {
var minNumber = document.querySelector('.min-number');
var maxNumber = document.querySelector('.max-number');

var randomNum;
var p1NameInput  = document.querySelector('.input--p1-name');
var p2NameInput  = document.querySelector('.input--p2-name');
var p1NameOutput  = document.querySelector('.output--p1-name');
var p2NameOutput  = document.querySelector('.output--p2-name');

var p1GuessInput  = document.querySelector('.input--p1-guess');
var p2GuessInput  = document.querySelector('.input--p2-guess');
var p1GuessOutput  = document.querySelector('.output--p1-guess');
var p2GuessOutput  = document.querySelector('.output--p2-guess');

var p1HiLo = document.querySelector('.p1-hi-lo');
var p2HiLo = document.querySelector('.p2-hi-lo');
var buttonClear = document.querySelector('.button--clear-game');
var buttonReset = document.querySelector('.button--reset-game');

var finishedGames = document.querySelector('.finished-games');

//********BEGIN EVENT LISTENERS**********
//Clear button event listeners

$('.button--clear-game').on('click', clear)
$('.input--p1-name').on('keyup', checkClearDisabled);
$('.input--p2-name').on('keyup', checkClearDisabled);  
$('.input--p1-guess').on('keyup', checkClearDisabled);
$('.input--p2-guess').on('keyup', checkClearDisabled);

//Reset button event listeners

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
 	minNumber.innerText = min;
 	maxNumber.innerText = max;
 	console.log('randomNum' + randomNum);
 	return randomNum;
};

//Establish local variables

$('.button--submit-guess').on('click', () => {
	var min = parseInt($('.input--min-range').val());
	var max = parseInt($('.input--max-range').val());
	var g1 = parseInt(p1GuessInput.value);
	var g2 = parseInt(p2GuessInput.value);
	var p1 = p1NameInput.value;
	var p2 = p2NameInput.value;
	nameError(min, max, g1, g2, p1, p2)
})


//Name and guess error conditions

function nameError(min, max, g1, g2, p1, p2) {
	if (p1NameInput.value === '' || p2NameInput.value === '') {
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
	p1NameOutput.innerText = p1;
	p2NameOutput.innerText = p2;
	p1GuessOutput.innerText = g1;
	p2GuessOutput.innerText = g2;
};

//Determins game winner

function p1Guess(min, max, g1, g2, p1, p2) {
	if (g1 < randomNum) {
		p1HiLo.innerText = 'That\'s too low';
	} else if (g1 > randomNum) {
		p1HiLo.innerText = 'That\'s too high';
	} else if (g1 == randomNum) {
		p1HiLo.innerText = 'BOOM!';
		w1 = p1;
		winnerStatement(min, max, g1, g2, p1, p2, w1);
	};
};

function p2Guess(min, max, g1, g2, p1, p2, w1) {
	if (g2 < randomNum) {
	 	p2HiLo.innerText = 'That\'s too low';
	} else if (g2 > randomNum) {
	 	p2HiLo.innerText = 'That\'s too high';
	} else if (g2 == randomNum) {
	 	p2HiLo.innerText = 'BOOM!';
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
	if (buttonClear.disabled === true) {
		clearDisable();
	};
};

function clearDisable() { 
	if (p1NameInput.value === '' &&
		p2NameInput.value === '' &&
		p1GuessInput.value === '' &&  
		p2GuessInput.value === '') {
		buttonClear.disabled = true;
	} else {
		buttonClear.disabled = false;
	};
};

function clear() {
	p1NameOutput.innerText = 'Challenger 1';
	p2NameOutput.innerText = 'Challenger 2';
	p1GuessOutput.innerText = 'Challenger 1 needs to guess';
	p2GuessOutput.innerText = 'Challenger 2 needs to guess';
	p1HiLo.innerText = '';
	p2HiLo.innerText = '';
	p1NameInput.value = '';
	p2NameInput.value = '';
	p1GuessInput.value = '';
	p2GuessInput.value = '';
	p1GuessOutput.innerText = '#';
	p2GuessOutput.innerText = '#';
};

//Reset button disable functions

function checkResetDisabled() {
	if (buttonReset.disabled === true) {
		resetDisable();
	};
};

function resetDisable() { 
	if (p1NameInput.value === '' &&
		p2NameInput.value === '' &&
		p1GuessInput.value === '' &&  
		p2GuessInput.value === '' &&
		parseInt($('.input--min-range').val()) === '' &&
		parseInt($('.input--max-range').val()) === '') {
		buttonReset.disabled = true;
	} else {
		buttonReset.disabled = false;
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










