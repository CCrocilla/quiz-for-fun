// ------------- Home ------------- //
// Variables Questions
window.availableQuestion = [];
// Variable Quiz Selection
const POINTS = 100;
const MAX_QUESTIONS = 10;
const moviesQuestions = document.getElementById('movies-btn');
const videogamesQuestions = document.getElementById('videogames-btn');
//  Variables Header and Footer
const header = document.getElementById('header');
const footer = document.getElementById('footer');
//  Variables Rules/Instructions Modal
let anchorInstruction = document.getElementById('anchor-instruction');
let modalInstruction = document.getElementById('modal-instruction');
//  Variables Close Functionality
let closeX = document.getElementsByClassName('close')[0];
//  Variable Quiz
let questionElement = document.getElementById('question-text');
let answersElement = Array.from(document.querySelectorAll('.answer-text'));
let progress = document.getElementById('progress');
let scoreText = document.getElementById('score');
let username = document.getElementById('username');
let currentQuestion = {};
let countDown = null;
let score = 0;
let questionCounter = 0;
// Variable Local Storage
// Username
const storedUsername = localStorage.getItem('inputUsername');
let playerName = storedUsername || "";


// ----------- Function Start button ----------- //
function startGameBtn() {
    let startView = document.getElementById('start-games');
    let preQuizView = document.getElementById('pre-quiz-view');
    startView.classList.add("hide");
    preQuizView.classList.remove("hide");
}

// ----------- Modal Rules/Instructions ----------- //
function openInstruction(event) {
    event.preventDefault();
    let startView = document.getElementById('start-games');

    modalInstruction.style.display = "flex";
    startView.classList.add("hide");
    header.classList.add("hide");
    footer.classList.add("hide");
}

// ----------- Quiz Engine ----------- //
/**
 * Local Storage Setup for Username, Score and Difficulty
 * Content Studied on W3 School and code custom by me for my needs
 */
function setValueUsername(value) {
    if (username) {
        username.value = value;
    }  
}

const saveLocalUsername = () => {
    localStorage.setItem('inputUsername', playerName);
};

// Local Storage Setup Difficulty Radio Buttons
const saveLocalDifficulty = () => {
    let inputRadio = document.querySelector('input[name="level_speed"]:checked');
    localStorage.setItem('inputDifficulty', inputRadio.value);
};

// ------------- Set Username -------------- //
setValueUsername(storedUsername);

// ------------- Check Validation Form -------------- //
function checkValidationForm() {
    let inputRadio = document.querySelector('input[name="level_speed"]:checked');
    let inputUsername = document.getElementById('username');
    let isValid = (inputUsername.value !== "" && inputRadio !== null);
    return isValid;
}

// ------------- Function to display Quiz Area -------------- //
function modeQuiz() {
    let startView = document.getElementById('start-games');
    let preQuizView = document.getElementById('pre-quiz-view');
    let questionView = document.getElementById('quiz-view');
    startView.classList.add("hide");
    preQuizView.classList.add('hide');
    questionView.classList.remove('hide');
}

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
            console.error('No available questions');
    }
    getQuestion();
    checkAnswer();
};

// ------------- Display Questions -------------- //
// Inspiration on how to create a Quiz from Brian Design and Web Dev Simplfied
function getQuestion() {
    if(window.availableQuestion.length === 0 || questionCounter === MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);
    
        return window.location.replace('quiz-score.html?open=endgame');
    }

    startTimer();
    questionCounter++;
    progress.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    
    // Generate a random value from the questions variable
    let questionsIndex = Math.floor(Math.random() * window.availableQuestion.length);
    currentQuestion = window.availableQuestion[questionsIndex];
    questionElement.innerText = currentQuestion.question;

    // Display the possible answers
    answersElement.forEach(answer => {
        let number = answer.dataset.number;
        answer.innerText = currentQuestion.answers[number - 1]; 
    });
    // Remove the Questions answered
    window.availableQuestion.splice(questionsIndex, 1);
}

// ------------- Check Correct Answer -------------- //
// Run Event for each answer clicked to check the match with the correct answer.
function checkAnswer() { 
    answersElement.forEach(answer => {
        answer.addEventListener('click', event => {
            let selectedChoice = event.target;
            let selectedAnswer = selectedChoice.dataset.number;
            
            // Condition to check if the answer is correct, apply the colour and increment the score if it is correct
            let answerColorChange = selectedAnswer == currentQuestion.correctAnswer ? 'correct-answer' : 'wrong-answer';
            if(answerColorChange === 'correct-answer') {
                incrementScore(POINTS);     
            } 
            // Function to disable clicks on the buttons
            disableAnswersBtns(true);

            selectedChoice.parentElement.classList.add(answerColorChange);
            setTimeout(() => {
                // Fuction to restore the functionality of the buttons
                disableAnswersBtns(false);
                selectedChoice.parentElement.classList.remove(answerColorChange);
                getQuestion();
            }, 1600);
        });
    });
}

// ------------- Increment Score ------------- //
function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

// ------------- Timer ------------- //
function startTimer() { 
    stopTimer();
    let elementTimerSec = document.querySelector('input[name="level_speed"]:checked');
    let timerSec = 0;
    if (elementTimerSec.value === 'easy'){
        // Set Timer Easy
        timerSec = 60;
    } else if (elementTimerSec.value === 'medium'){
        // Set Timer Medium
        timerSec = 30;
    } else if (elementTimerSec.value === 'hard'){
        // Set Timer Hard
        timerSec = 15;
    } else {
        timerSec = 0;
        console.error('No difficulty has been selected');
    }

    countDown = setInterval(function() {   
        document.getElementById('quiz-time').innerText = timerSec;
        timerSec--;
        if (timerSec === -1) {
            clearInterval(countDown);
            getQuestion();
        }
    }, 1000);
}
// Function to Stop Timer
function stopTimer() {
    if (countDown !== null) {
        clearInterval(countDown);
    }
}

// ------------- Function Disable Buttons -------------- //
function disableAnswersBtns(isDisabled) {
    answersElement.forEach(answer => {
        answer.disabled = isDisabled;
    });
}

/**
 * Wait for the DOM to finish loading before running the game
 * Get the Start Button Elements and add event listeners to them
 * DOMContentLoaded taken from Love-Math Project
 */
 document.addEventListener("DOMContentLoaded", function() {
    let startBtn = document.getElementById("start-btn");
    startBtn.addEventListener('click', () => {
        startGameBtn();
    });
});

// Listen changes in Username
username.addEventListener('change', user => {
    playerName = user.target.value;
});

// Check if username as been filled in before to start the Movies quiz then start quiz movies
moviesQuestions.addEventListener('click', (event) => {
    if (checkValidationForm()) {
        event.preventDefault();
        saveLocalUsername();
        saveLocalDifficulty();
        modeQuiz();
        startGame('movies');
    } else {
        console.error('Form not valid!');
    }
});

// Check if username as been filled in before to start the Videogames quiz then start quiz videogames
videogamesQuestions.addEventListener('click', (event) => {
    if (checkValidationForm()) {
        event.preventDefault();
        saveLocalUsername();
        modeQuiz();
        startGame('videogames');
    } else {
        console.error('Form not valid!');
    }
});

// ------------- Event Close Modal -------------- //
// Studied on W3 School, customized and created the code for my needs
// When the user clicks on the button, open the modal
anchorInstruction.addEventListener('click', openInstruction);

// When the user clicks on x, close the modal
closeX.onclick = function() {
    let startView = document.getElementById('start-games');
    modalInstruction.style.display = "none";
    startView.classList.remove("hide");
    header.classList.remove("hide");
    footer.classList.remove("hide");
};
  
// When the user clicks outside of the modal, close the modal
window.onclick = function(event) {
    let startView = document.getElementById('start-games');
    
    if (event.target == modalInstruction) {
        modalInstruction.style.display = "none";
        startView.classList.remove("hide");
        header.classList.remove("hide");
        footer.classList.remove("hide");
    }
};