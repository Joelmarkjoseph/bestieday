const words = [
    { word: "DOBBAI", missing: ["O", "B", "A"] },
    { word: "PANDHI", missing: ["A", "D"] },
    { word: "NAYALAA", missing: ["A","L"] }
];

let currentWord = {};
let currentIndex = 0; // To track the current word index
let wordsGuessedCorrectly = 0;

const wordContainer = document.getElementById('word-container');
const userInput = document.getElementById('userInput');
const resultMessage = document.getElementById('resultMessage');
const submitButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetButton');

// Initialize the game
function init() {
    resultMessage.textContent = "";
    userInput.value = "";
    currentIndex = 0;
    wordsGuessedCorrectly = 0; // Reset guessed words counter
    loadNewWord();
}

// Load the next word in sequence
function loadNewWord() {
    if (currentIndex < words.length) {
        currentWord = words[currentIndex];
        displayWordWithBlanks();
    } else {
        // All words guessed, redirect to surprise.html
        window.location.href = "surprise.html";
    }
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
        wordsGuessedCorrectly++;
        currentIndex++;

        // If all words are guessed, redirect after 5 seconds
        if (wordsGuessedCorrectly === words.length) {
            setTimeout(() => {
                window.location.href = "surprise.html";
            }, 1000); // Redirect to surprise.html after 5 seconds
        } else {
            // Load the next word after 5 seconds
            setTimeout(() => {
                resultMessage.textContent = "";
                userInput.value = "";
                loadNewWord();
            }, 1000);
        }
    } else {
        resultMessage.textContent = "Incorrect letters! Try again.";
        resultMessage.style.color = "red";
    }
});

// Reset the game
resetButton.addEventListener('click', init);

// Initialize the game on page load
window.onload = init;
