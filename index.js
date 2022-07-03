// Initialize game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let turns = 0;
let rounds = 1;

//grab dom elements
const message = document.getElementById('message');
const player1Scoreboard = document.getElementById('player1Scoreboard');
const player2Scoreboard = document.getElementById('player2Scoreboard');
const player1Dice = document.getElementById('player1Dice');
const player2Dice = document.getElementById('player2Dice');
const rollBtn = document.getElementById('rollBtn');
const resetBtn = document.getElementById('resetBtn');
const gambleBtn = document.getElementById('gambleBtn');
const donMessage = document.getElementById('donMessage');
const roundMsg = document.getElementById('roundMsg');
const rules = document.getElementById('rules');
const showRules = document.getElementById('showRules');
const game = document.getElementById('game');
const startGame = document.getElementById('startGame');

//change display of button function
const changeDisplayBtn = () => {
    rollBtn.style.display = 'none';
    gambleBtn.style.display = 'none';
    resetBtn.style.display = 'block';
};

//displays winner
const displayWinner = () => {
    if (turns % 2 == 0 && player1Score >= 20) {
        message.textContent = 'Player 1 Wins 🥳';
        changeDisplayBtn();
    } else if (turns % 2 == 0 && player2Score >= 20) {
        message.textContent = 'Player 2 Wins 🎉';
        changeDisplayBtn();
    }
};

//toggles animation
const toggleAnimation = () => {
    player1Dice.classList.remove('rotate-scale-down');
    player2Dice.classList.remove('rotate-scale-down');
    void player1Dice.offsetWidth;
    void player2Dice.offsetWidth;
    player1Dice.classList.add('rotate-scale-down');
    player2Dice.classList.add('rotate-scale-down');
};

const moveActiveToPlayer1 = () => {
    player2Dice.classList.remove('active');
    player1Dice.classList.add('active');
};

const moveActiveToPlayer2 = () => {
    player1Dice.classList.remove('active');
    player2Dice.classList.add('active');
};

//double or nothing mini functions i.e they perform the double or nothing functionality for the 2 players
const donPlayer1 = (e) => {
    player1Score *= e;
    player1Scoreboard.textContent = player1Score;
    message.textContent = 'Player 2 Turn';
    turns++;
    moveActiveToPlayer2();
};

const donPlayer2 = (e) => {
    player2Score *= e;
    player2Scoreboard.textContent = player2Score;
    message.textContent = 'Player 1 Turn';
    turns++;
    moveActiveToPlayer1();
};

//displays rounds
const displayRound = () => {
    if (turns % 2 == 0) {
        rounds++;
    }

    roundMsg.textContent = `Round ${rounds}`;
};

//create function that runs game
const rollDice = () => {
    //enables the rolling of the dice animation
    toggleAnimation();

    //gives a random number between 1 and 6
    let randomNum = Math.floor(Math.random() * 6) + 1;

    //in the above function, create a conditional that alternates turns between the 2 players
    if (player1Turn) {
        message.textContent = 'Player 2 Turn';
        player1Score += randomNum;
        player1Scoreboard.textContent = player1Score;
        player1Dice.textContent = randomNum;
        moveActiveToPlayer2();
        turns++;
    } else {
        message.textContent = 'Player 1 Turn';
        player2Score += randomNum;
        player2Scoreboard.textContent = player2Score;
        player2Dice.textContent = randomNum;
        moveActiveToPlayer1();
        turns++;
    }

    player1Turn = !player1Turn;

    //triggering the display of the gambleBtn
    if (player1Score > 0 && player2Score > 0) {
        gambleBtn.style.display = 'block';
    }

    // create a conditional for when max score is reached
    displayWinner();

    //displays the round
    displayRound();
};

//function that resets game
const resetGame = () => {
    message.textContent = 'Player 1 Turn';
    player1Score = 0;
    player2Score = 0;
    player1Turn = true;
    turns = 0;
    rounds = 1;
    roundMsg.textContent = `Round ${rounds}`;
    player1Scoreboard.textContent = player1Score;
    player2Scoreboard.textContent = player2Score;
    player1Dice.textContent = '-';
    player2Dice.textContent = '-';
    moveActiveToPlayer1();
    rollBtn.style.display = 'block';
    resetBtn.style.display = 'none';
};

//function that either doubles your score, keeps it the same or sends it back to 0
const doubleOrNothing = () => {
    //gives a random number between 1 and 2
    let num = Math.floor(Math.random() * 2) + 1;

    if (player1Turn && num == 2) {
        donPlayer1(num);
        donMessage.textContent = 'Your score has been doubled, Player 1 💃';
    } else if (player1Turn && num == 1) {
        donPlayer1(num);
        donMessage.textContent = 'Your score remains the same, Player 1 😞';
    } else if (num == 2) {
        donPlayer2(num);
        donMessage.textContent = 'Your score has been doubled, Player 2 💃';
    } else if (num == 1) {
        donPlayer2(num);
        donMessage.textContent = 'Your score remains the same, Player 2 😞';
    }
    // gambleBtn.style.display = 'none'
    player1Turn = !player1Turn;
    //displays winner
    displayWinner();
    //removes message uner buttons
    setTimeout(() => {
        donMessage.textContent = '';
    }, 1000);
    //shows the rounds
    displayRound();
};

//function that displays the game div and rules button
const displayGame = () => {
    rules.classList.add('slide-out-elliptic-left-fwd');
    // rules.style.display = 'none'
    showRules.style.display = 'block';
    game.style.display = 'block';
};

//function that displays the game rules
const displayGameRules = () => {
    rules.classList.remove('slide-out-elliptic-left-fwd');
    rules.style.display = 'block';
    showRules.style.display = 'none';
    game.style.display = 'none';
};

//attach click event listener to roll button
rollBtn.addEventListener('click', rollDice);

//attach click event listener to reset button
resetBtn.addEventListener('click', resetGame);

// attach click event listener to gamble button
gambleBtn.addEventListener('click', doubleOrNothing);

// attach click event listener to start game button
startGame.addEventListener('click', displayGame);

// attach click event listener to showRules button
showRules.addEventListener('click', displayGameRules);
