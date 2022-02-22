 
// -----------> Home
//  Variables Home Page
let startBtn = document.getElementById('start-btn');
let startView = document.getElementById('start-games');
let quizView = document.getElementById('pre-quiz-view');
let questionView = document.getElementById('quiz-view');
//  Variables Instruction
let anchorInstruction = document.getElementById('anchor-instruction')
let modalInstruction = document.getElementById('modal-instruction');
//  Variables Contact Us
let anchorContactUs = document.getElementById('anchor-contact');
let modalContactUs = document.getElementById('anchor-contact');
//  Variables Close Functionality
let close = document.getElementsByClassName('close')[0];


// Wait for the DOM to finish loading before running the game
// Get the Button Elements and add event listeners to them
// DOMContentLoaded taken from Love-Math Project
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                startGameBtn();
            } /*else {
                alert("Something went wrong");
            }*/
        })
    }
})

function startGameBtn() {
    startView.classList.add("hide");
    startBtn.classList.add("hide");
    quizView.classList.remove("hide");
}

// -----------> Modal Instruction (Reference W3 School)
//When the user clicks on the button, open the modal
anchorInstruction.addEventListener('click', openInstruction);

function openInstruction() {
    modalInstruction.style.display = "flex";
    startView.classList.add("hide");
    startBtn.classList.add("hide");
}

// When the user clicks on x, close the modal
close.onclick = function() {
    modalInstruction.style.display = "none";
    startView.classList.remove("hide");
    startBtn.classList.remove("hide");
}
  
// When the user clicks outside of the modal, close the modal
window.onclick = function(event) {
    if (event.target == modalInstruction) {
        modalInstruction.style.display = "none";
    } else if (event.target == modalContactUs ) {
        modalContactUs.style.display = "none";
    }
} 
// -----------> End Modal


// -----------> Quiz Engine
//  Variables Quiz
//Const > Variable > Arrow Function > addEvent
// Declared globally
window.availableQuestion = [];

const POINTS = 10;
const MAX_QUESTIONS = 2;
const moviesQuestions = document.getElementById('movies-btn');
const videogamesQuestions = document.getElementById('videogames-btn');

let questionElement = document.getElementById('question-text');
let answersElement = Array.from(document.querySelectorAll('.answer-text'));
let progress = document.getElementById('progress');
let progressFull = document.getElementById('progress-full');
let scoreText = document.getElementById('score');

let currentQuestion = {};
let trueAnswer = true;
let score = 0;
let questionCounter = 0;
let shuffleQuestion;



// Disable Buttons if username is empty
username.addEventListener('keyup', () => {
    moviesQuestions.disabled = !username.value;
    videogamesQuestions.disabled = !username.value;
})

// Check if username as been filled in before to start the Movies quiz
moviesQuestions.addEventListener('click', () => {
    startView.classList.add("hide");
    startBtn.classList.add("hide");
    quizView.classList.add('hide');
    questionView.classList.remove('hide');
    startGame('movies')
})

// Check if username as been filled in before to start the Videogames quiz
videogamesQuestions.addEventListener('click', () => {
    startView.classList.add("hide");
    startBtn.classList.add("hide");
    quizView.classList.add('hide');
    questionView.classList.remove('hide');
    startGame('videogames')
})

// Function to start the quiz
const startGame = (game) => {
    questionCounter = 0;
    score = 0;
    // Switch between questions category
    switch (game){
        case 'movies':
            window.availableQuestion = questionsMovies;
            break;
        case 'videogames':
            window.availableQuestion = questionsVideogames;
            break;
        default: 
            window.availableQuestion = [];
            console.error('Not available questions')
    }
    getQuestion();
}

// Function to get new questions. callback => arrow function
const getQuestion = () => {
    if(window.availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);

      //  return window.location.assign('end-game.html');
    }

    questionCounter++;
    progress.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    // Generate a random value from the questions variable
    let questionsIndex = Math.floor(Math.random() * window.availableQuestion.length);
    let currentQuestion = window.availableQuestion[questionsIndex];
    questionElement.innerText = currentQuestion.question;

    // Required to display the possible answers
    answersElement.forEach(answer => {
        let number = answer.dataset['number'];
        answer.innerText = currentQuestion.answers[number - 1]; 
    })
    // Remove the Question answered
    window.availableQuestion.splice(questionsIndex, 1);

    trueAnswer = true;
}

// Run Event for each answer clicked.
answersElement.forEach(answer => {
    answer.addEventListener('click', event => {
        if(trueAnswer != true) return;

        let selectedChoice = event.target;
        let selectedAnswer = selectedChoice.dataset['number'];

        let answerColorChange = selectedAnswer == currentQuestion.correctAnswer ? 'correct-answer' : 'wrong-answer';
        
        if(answerColorChange === 'correct-answer') {
            incrementScore(POINTS);
        }

        selectedChoice.parentElement.classList.add(answerColorChange);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(answerColorChange);
            getQuestion();
        }, 1000);
    })
})

// Increment Score 
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


