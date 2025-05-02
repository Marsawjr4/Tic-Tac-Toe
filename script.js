const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const boardState = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;
const cells = document.querySelectorAll('.cell');

let scoreX = 0;
let scoreO = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function renderBoard(){
    cells.forEach((cell, index) => {
        cell.textContent = boardState[index];
    });
}

function handleCellClick(event) {
    const cellIndex = Array.from(cells).indexOf(event.target);

    if (boardState[cellIndex] || !isGameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    renderBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c])
        {
            isGameActive = false;
            if (boardState[a] === 'X') {
                scoreX++;
            }
            else {
                scoreO++;
            }
            updateScore();
            alert(`${boardState[a]} wins!`);
            return;
        }
        }

        if (!boardState.includes(null)) {
            isGameActive = false;
            alert('It\'s a draw!');
        }
    }

    function resetGame(){
        boardState.fill(null);
        currentPlayer = 'X';
        isGameActive = true;
        renderBoard();
    }

    function initializeGame() {
        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        resetButton.addEventListener('click', resetGame);
        renderBoard();
    }

    function updateScore() {
        document.getElementById('score-x').textContent = `Player X: ${scoreX}`;
        document.getElementById('score-o').textContent = `Player O: ${scoreO}`;
    }

    function updateTurnIndicator() {
        document.getElementById('turn-indicator').textContent =
        `Current Turn: ${currentPlayer}`;
    }

document.addEventListener('DOMContentLoaded', () => {
    initializeGame();
});