 
let startBtn = document.getElementById('start-btn');
let startView = document.getElementById('start-games');
let quizView = document.getElementById('quiz-view');
// Instruction
let anchorInstruction = document.getElementById('anchor-instruction')
let modalInstruction = document.getElementById('modal-instruction');
// Contact Us
let anchorContactUs = document.getElementById('anchor-contact');
let modalContactUs = document.getElementById('anchor-contact');
// Close Functionality
let close = document.getElementsByClassName('close');


// Wait for the DOM to finish loading before running the game
// Get the Button Elements and add event listeners to them
// DOMContentLoaded taken from Love-Math Project
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                startGame();
            } else {
                alert("Something went wrong");
            }
        })
    }
})

function startGame() {
    startView.classList.add("hide");
    startBtn.classList.add("hide");
    quizView.classList.remove("hide");
}

//W3 School
//When the user clicks on the button, open the modal
anchorInstruction.onclick = function() {
    modalInstruction.style.display = "flex";
}
  
// When the user clicks on x, close the modal
close.onclick = function() {
    modalInstruction.style.display = "none";
}
  
// When the user clicks outside of the modal, close the modal
window.onclick = function(event) {
    if (event.target == modalInstruction) {
        modalInstruction.style.display = "none";
    } else if (event.target == modalContactUs ) {
        modalContactUs.style.display = "none";
    }
} 
