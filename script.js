const symbols = ["mori", "temee", "ymaa", "honi"]; // Ankle bone symbols

let scores = [0, 0];
let currentPlayer = 1;
let isPlayerTurn = true; // Boolean to check player turn

function shagaiOrhih(player) {
    if (!isPlayerTurn || scores[0] >= 8 || scores[1] >= 8 || currentPlayer !== player) {
        return; // It's not the player's turn or game is finished
    }

    isPlayerTurn = false; // Disable the player's turn

    const tossedBones = tossAnkleBones();
    displayResult(player, tossedBones);
    updateCenterImages(tossedBones);

    currentPlayer = currentPlayer === 1 ? 2 : 1;
    isPlayerTurn = true; // Allow the next player to take a turn
}

function tossAnkleBones() {
    const tossedBones = [];

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * symbols.length);
        const symbol = symbols[randomIndex];
        tossedBones.push(symbol);
    }

    return tossedBones;
}

function displayResult(player, tossedBones) {
    const playerScore = document.getElementById(`player${player}Score`);
    const moriCount = tossedBones.filter(bone => bone === 'mori').length;

    scores[player - 1] += moriCount;
    playerScore.textContent = `${scores[player - 1]} морь`;

    if (scores[player - 1] >= 8) {
        const winMessage = `Тоглогч ${player} яллаа!`;
        document.getElementById('winnerMessage').textContent = winMessage;
        disableButtons();
    }

    isPlayerTurn = true; // Allow the next player to take a turn
}

function disableButtons() {
    document.querySelector('.p1').disabled = true;
    document.querySelector('.p2').disabled = true;
}

function resetGame() {
    // Reset scores, current player, and enable buttons
    scores = [0, 0];
    currentPlayer = 1;
    isPlayerTurn = true;

    const player1Score = document.getElementById('player1Score');
    const player2Score = document.getElementById('player2Score');

    player1Score.textContent = '0 морь';
    player2Score.textContent = '0 морь';

    document.querySelector('.p1').disabled = false;
    document.querySelector('.p2').disabled = false;

    // Reset the winner message
    document.getElementById('winnerMessage').textContent = '';

    // Reset the center images
    const images = document.querySelectorAll('.shagai img');
    images.forEach(image => {
        image.src = './img/mori.jpg';
        image.alt = '';
    });

    // Reset horse positions
    const horseImage1 = document.querySelector('.horse1');
    const horseImage2 = document.querySelector('.horse2');
    horseImage1.style.left = '0px';
    horseImage2.style.left = '0px';
    
    // Reset mori counts for each player
    moriCountPlayer1 = 0;
    moriCountPlayer2 = 0;
}



let moriCountPlayer1 = 0;
let moriCountPlayer2 = 0;

function updateCenterImages(tossedBones) {
    const images = document.querySelectorAll('.shagai img');
    const horseImage1 = document.querySelector('.horse1');
    const horseImage2 = document.querySelector('.horse2');

    tossedBones.forEach((symbol, index) => {
        const imgSrc = `./img/${symbol}.jpg`;
        images[index].src = imgSrc;
        images[index].alt = symbol;
    });

    // Calculate mori count for the current player
    const moriCount = tossedBones.filter(bone => bone === 'mori').length;

    // Move the respective horse image based on the mori count
    if (currentPlayer === 1) {
        moriCountPlayer1 += moriCount;
        horseImage1.style.left = `${Math.min(moriCountPlayer1 * 100, MAX_MOVEMENT)}px`;
        horseImage2.style.left = `${Math.min(moriCountPlayer2 * 100, MAX_MOVEMENT)}px`;
    } else {
        moriCountPlayer2 += moriCount;
        horseImage1.style.left = `${Math.min(moriCountPlayer1 * 100, MAX_MOVEMENT)}px`;
        horseImage2.style.left = `${Math.min(moriCountPlayer2 * 100, MAX_MOVEMENT)}px`;
    }
}

const MAX_MOVEMENT = 8 * 100; // Maximum allowed left movement

// Inside the function where you handle the mori counts and horse movements
if (currentPlayer === 1) {
    moriCountPlayer1 += moriCount;
    if (moriCountPlayer1 > 8) {
        moriCountPlayer1 = 8; // Cap the count at 8
    }
    horseImage1.style.left = `${Math.min(moriCountPlayer1 * 100, MAX_MOVEMENT)}px`;
    horseImage2.style.left = `${Math.min(moriCountPlayer2 * 100, MAX_MOVEMENT)}px`;
} else {
    moriCountPlayer2 += moriCount;
    if (moriCountPlayer2 > 8) {
        moriCountPlayer2 = 8; // Cap the count at 8
    }
    horseImage1.style.left = `${Math.min(moriCountPlayer1 * 100, MAX_MOVEMENT)}px`;
    horseImage2.style.left = `${Math.min(moriCountPlayer2 * 100, MAX_MOVEMENT)}px`;
}

