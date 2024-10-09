const gridSize = 10;
const wordsToFind = ["CODE", "HTML", "CSS", "JAVASCRIPT", "REACT"];
let score = 0;

const gridContainer = document.getElementById("grid-container");
const scoreDisplay = document.getElementById("score");
const resetButton = document.getElementById("resetButton");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let selectedCells = [];

// Initialize the game
function init() {
    gridContainer.innerHTML = "";
    selectedCells = [];
    score = 0;
    scoreDisplay.textContent = score;
    createGrid();
    placeWords();
}

// Create the grid dynamically
function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-item");
        cell.textContent = getRandomLetter();
        cell.addEventListener("mousedown", handleMouseDown);
        cell.addEventListener("mouseup", handleMouseUp);
        gridContainer.appendChild(cell);
    }
}

// Get a random letter for grid cells
function getRandomLetter() {
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

// Place words into the grid
function placeWords() {
    wordsToFind.forEach(word => {
        let placed = false;
        while (!placed) {
            const randomStart = Math.floor(Math.random() * gridSize * gridSize);
            const randomDirection = Math.floor(Math.random() * 4);
            placed = placeWord(randomStart, word, randomDirection);
        }
    });
}

// Try placing a word in the grid
function placeWord(startIndex, word, direction) {
    let row = Math.floor(startIndex / gridSize);
    let col = startIndex % gridSize;
    const wordLength = word.length;

    if (direction === 0 && col + wordLength <= gridSize) { // Horizontal Right
        for (let i = 0; i < wordLength; i++) {
            const index = row * gridSize + col + i;
            const cell = gridContainer.children[index];
            cell.textContent = word[i];
        }
        return true;
    } else if (direction === 1 && col - wordLength >= 0) { // Horizontal Left
        for (let i = 0; i < wordLength; i++) {
            const index = row * gridSize + col - i;
            const cell = gridContainer.children[index];
            cell.textContent = word[i];
        }
        return true;
    } else if (direction === 2 && row + wordLength <= gridSize) { // Vertical Down
        for (let i = 0; i < wordLength; i++) {
            const index = (row + i) * gridSize + col;
            const cell = gridContainer.children[index];
            cell.textContent = word[i];
        }
        return true;
    } else if (direction === 3 && row - wordLength >= 0) { // Vertical Up
        for (let i = 0; i < wordLength; i++) {
            const index = (row - i) * gridSize + col;
            const cell = gridContainer.children[index];
            cell.textContent = word[i];
        }
        return true;
    }
    return false;
}

// Handle mouse down (starting to select a word)
function handleMouseDown(event) {
    selectedCells.push(event.target);
    event.target.classList.add("selected");
}

// Handle mouse up (finishing word selection)
function handleMouseUp() {
    const selectedWord = selectedCells.map(cell => cell.textContent).join('');
    
    if (wordsToFind.includes(selectedWord)) {
        selectedCells.forEach(cell => {
            cell.classList.remove("selected");
            cell.classList.add("correct");
        });
        score++;
        scoreDisplay.textContent = score;
    } else {
        selectedCells.forEach(cell => {
            cell.classList.remove("selected");
        });
    }
    
    selectedCells = [];
}

// Reset the game
resetButton.addEventListener("click", () => {
    init();
});

// Initialize the grid when page loads
window.onload = init;
