'use strict';

// Selecting elements
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

// Starting conditions

let scores, currentScore, activePlayer, playing;

const init = function () {
  diceEl.classList.add(`hidden`);

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

// Rolling dices
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. Displaying dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    //3. Check if 1 and switch the player, if true
    if (dice !== 1) {
      // keep adding the score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch player if dice === 1
      switchPlayer();
    }
  }
});
btnHold.addEventListener(`click`, function () {
  if (playing) {
    //1.Add the active players score to the total score of his
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if players score is >= 100 , if so he wins and finish the game
    if (scores[activePlayer] >= 100) {
      diceEl.classList.remove(`hidden`);
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
