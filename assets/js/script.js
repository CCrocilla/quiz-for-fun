 
// ------------- Home ------------- //
//  Variables Header and Footer
let header = document.getElementById('header');
let footer = document.getElementById('footer');
//  Variables Home Page
let startBtn = document.getElementById('start-btn');
let startView = document.getElementById('start-games');
let preQuizView = document.getElementById('pre-quiz-view');
let questionView = document.getElementById('quiz-view');
//  Variables Instruction
let anchorInstruction = document.getElementById('anchor-instruction');
let modalInstruction = document.getElementById('modal-instruction');
//  Variables Close Functionality
let close = document.getElementsByClassName('close')[0];
//  Variables Hamburger Menu
let mobileMenu = document.getElementById('menu-mobile');
let desktopMenu = document.getElementsByClassName('navbar-hide')[0];


// Wait for the DOM to finish loading before running the game
// Get the Button Elements and add event listeners to them
// DOMContentLoaded taken from Love-Math Project
document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "start") {
                startGameBtn();
            } else {
                console.log("Something went wrong!");
            }
        })
    }
})

function startGameBtn() {
    startView.classList.add("hide");
    preQuizView.classList.remove("hide");
}


// ----------- Hamburger Menu ----------- //
mobileMenu.addEventListener('click', openNavBar);

function openNavBar() {
    if (desktopMenu.style.display === "none") {
        desktopMenu.style.display = "flex";
    } else {
        desktopMenu.style.display = "none";
    }
}

// -----------  End Hamburger Menu ----------- //


// ----------- Modal Instruction (Studied on W3 School) ----------- //
//When the user clicks on the button, open the modal
anchorInstruction.addEventListener('click', openInstruction);

function openInstruction() {
    modalInstruction.style.display = "flex";
    startView.classList.add("hide");
    header.classList.add("hide");
    footer.classList.add("hide");
}

// When the user clicks on x, close the modal
close.onclick = function() {
    modalInstruction.style.display = "none";
    startView.classList.remove("hide");
    header.classList.remove("hide");
    footer.classList.remove("hide");
}
  
// When the user clicks outside of the modal, close the modal
window.onclick = function(event) {
    if (event.target == modalInstruction) {
        modalInstruction.style.display = "none";
        startView.classList.remove("hide");
        header.classList.remove("hide");
        footer.classList.remove("hide");
    }
} 
// ----------- End Modal ----------- //


// ----------- Quiz Engine ----------- //
//  Variables Quiz
//Const > Variable > Arrow Function > addEvent
// Declared globally
window.availableQuestion = [];

const POINTS = 100;
const MAX_QUESTIONS = 3;
const moviesQuestions = document.getElementById('movies-btn');
const videogamesQuestions = document.getElementById('videogames-btn');

let questionElement = document.getElementById('question-text');
let answersElement = Array.from(document.querySelectorAll('.answer-text'));
let progress = document.getElementById('progress');
let progressFull = document.getElementById('progress-full');
let scoreText = document.getElementById('score');
let username = document.getElementById('username')

let currentQuestion = {};
let countDown = null;
let score = 0;
let questionCounter = 0;
let shuffleQuestion;


// Local Storage Setup for Username
username.addEventListener('input', user => {
    playerName = user.target.value;
})

const saveLocalUsername = () => {
    localStorage.setItem('inputUsername', playerName);
}

const storedUsername = localStorage.getItem('inputUsername');

moviesQuestions.addEventListener('click', saveLocalUsername);
videogamesQuestions.addEventListener('click', saveLocalUsername);

if (username) {
    username.value = storedUsername;
}
// End Local Storage Setup for Username 



// Disable Buttons if username is empty
username.addEventListener('keyup', () => {
    moviesQuestions.disabled = !username.value;
    videogamesQuestions.disabled = !username.value;
})

// Check if username as been filled in before to start the Movies quiz
moviesQuestions.addEventListener('click', () => {
    startView.classList.add("hide");
    preQuizView.classList.add('hide');
    questionView.classList.remove('hide');
    startGame('movies')
})

// Check if username as been filled in before to start the Videogames quiz
videogamesQuestions.addEventListener('click', () => {
    startView.classList.add("hide");
    preQuizView.classList.add('hide');
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
            console.error('No available questions')
    }
    getQuestion();
}

// Function to get new questions using callback => arrow function
const getQuestion = () => {
    if(window.availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);
    
    return window.location.assign('quiz-score.html');
    }

    startTimer();
    questionCounter++;
    progress.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    // Generate a random value from the questions variable
    let questionsIndex = Math.floor(Math.random() * window.availableQuestion.length);
    currentQuestion = window.availableQuestion[questionsIndex];
    questionElement.innerText = currentQuestion.question;

    // Display the possible answers
    answersElement.forEach(answer => {
        let number = answer.dataset['number'];
        answer.innerText = currentQuestion.answers[number - 1]; 
    })
    // Remove the Questions answered
    window.availableQuestion.splice(questionsIndex, 1);

    checkAnswer();
}

// Run Event for each answer clicked to check the match with the correct answer.
function checkAnswer() { 
    answersElement.forEach(answer => {
        answer.addEventListener('click', event => {
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
}

// ------------- Increment Score ------------- //
let incrementScore = num => {
    score += num;
    scoreText.innerText = score;
    console.log(score)
}


// ------------- Timer ------------- //
function startTimer() { 
    stopTimer();
    let elementTimerSec = document.querySelector('input[name="level_speed"]:checked');
    let timerSec = 0;
    if (elementTimerSec.value === 'easy'){
        timerSec = 200;
    } else if (elementTimerSec.value === 'medium'){
        timerSec = 100;
    } else if (elementTimerSec.value === 'hard'){
        timerSec = 20;
    } else {
        timerSec = 0;
        console.error('No difficulty has been selected');
    }

    countDown = setInterval(function() {   
        document.getElementById('quiz-time').innerText = timerSec;
        timerSec--;
        if (timerSec === -1) {
            clearInterval(countDown);
            alert("Game Over!!");
        }
    }, 1000);
}

function stopTimer() {
    if (countDown !== null) {
        clearInterval(countDown);
    }
}
// ------------- End Timer ------------- //

