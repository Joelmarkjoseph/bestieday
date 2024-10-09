const words = [
    { word: "DOBBAI", missing: ["O", "B", "A"] },
    { word: "PANDHI", missing: ["A", "D"] },
    { word: "DENGAI", missing: ["D","N","I"] },
    // { word: "PYTHON", missing: ["T", "O"] }
];
let currentWord = {};
const wordContainer = document.getElementById('word-container');
const userInput = document.getElementById('userInput');
const resultMessage = document.getElementById('resultMessage');
const submitButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetButton');

// Initialize the game
function init() {
    resultMessage.textContent = "";
    userInput.value = "";
    currentWord = words[Math.floor(Math.random() * words.length)];
    displayWordWithBlanks();
}

// Display word with blanks
function displayWordWithBlanks() {
    let displayedWord = currentWord.word;
    currentWord.missing.forEach(missingLetter => {
        displayedWord = displayedWord.replace(missingLetter, '_ ');
    });
    wordContainer.textContent = displayedWord;
}

// Check if the player's input is correct
submitButton.addEventListener('click', () => {
    const userLetters = userInput.value.toUpperCase().split('');
    let correct = true;

    if (userLetters.length !== currentWord.missing.length) {
        resultMessage.textContent = "Incorrect number of letters! Try again.";
        resultMessage.style.color = "red";
        return;
    }

    currentWord.missing.forEach((missingLetter, index) => {
        if (userLetters[index] !== missingLetter) {
            correct = false;
        }
    });

    if (correct) {
        resultMessage.textContent = "Congratulations! You've completed the word!";
        resultMessage.style.color = "green";
        wordContainer.textContent = currentWord.word;
    } else {
        resultMessage.textContent = "Incorrect letters! Try again.";
        resultMessage.style.color = "red";
    }
});

// Reset the game
resetButton.addEventListener('click', init);

// Initialize the game on page load
window.onload = init;
