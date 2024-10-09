// Get the button and input field
const submitReply = document.getElementById('submitReply');
const userReply = document.getElementById('userReply');

// Add event listener for when the button is clicked
submitReply.addEventListener('click', () => {
    // Check if user has entered some text in the input field
    if (userReply.value.trim() !== "") {
        // Redirect to puzzle.html
        window.location.href = "fillblanks.html";
    } else {
        // If input is empty, show an alert to ask for a reply
        alert("Please enter your reply.");
    }
});
