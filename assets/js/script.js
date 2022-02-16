// Wait for the DOM to finish loading before running the game
// Get the Button Elements and add event listeners to them
// DOMContentLoaded taken from Love-Math Project 
let startBtn = document.getElementById('start-btn');
let startView = document.getElementById('start-view');
let quizView = document.getElementById('quiz-view');


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
    startView.classList.remove("game.area");
    startBtn.classList.add("hide");
    quizView.classList.remove("hide")
}