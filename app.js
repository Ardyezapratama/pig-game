"use strict";

// Selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

// Function to switch player
const switchPlayer = () => {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle("player--active");
	player1El.classList.toggle("player--active");
};
// Rolling dice functionality
btnRoll.addEventListener("click", () => {
	if (isPlaying) {
		// 1. Generating a random dice roll
		const dice = Math.floor(Math.random() * 6) + 1;

		// 2. Display dice
		diceEl.classList.remove("hidden");
		diceEl.src = `dice-${dice}.png`;

		// 3. Check for rolled 1: if true, switch to next player
		if (dice !== 1) {
			// Add dice to current score
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent =
				currentScore;
		} else {
			// Switch to next player
			switchPlayer();
		}
	}
});

// Hold button functionality
btnHold.addEventListener("click", () => {
	if (isPlaying) {
		// 1. Add current score to active player's score
		score[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			score[activePlayer];

		// 2.Check if player's score is >= 100
		if (score[activePlayer] >= 100) {
			// Finish the game
			isPlaying = false;
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active");
			// diceEl.classList.add("hidden");
			// btnRoll.classList.add("hidden");
			// btnHold.classList.add("hidden");
		} else {
			// Switch to the next palyer
			switchPlayer();
		}
	}
});

// New button functionality
btnNew.addEventListener("click", () => {
	isPlaying = true;
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;
	score[0] = 0;
	score[1] = 0;
	currentScore = 0;
	activePlayer = 0;
	player0El.classList.remove("player--winner");
	player1El.classList.remove("player--winner");
	player0El.classList.add("player--active");
	player1El.classList.remove("player--active");
	diceEl.classList.add("hidden");
	btnRoll.classList.remove("hidden");
	btnHold.classList.remove("hidden");
});
