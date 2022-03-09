// ------------- Home ------------- //
//  Variables Header and Footer
let header = document.getElementById('header');
let footer = document.getElementById('footer');
//  Variables Instruction
let anchorInstruction = document.getElementById('anchor-instruction');
let modalInstruction = document.getElementById('modal-instruction');
//  Variables Close Functionality
let closeX = document.getElementsByClassName('close')[0];

/**
 * Wait for the DOM to finish loading before running the game
 * Get the Button Elements and add event listeners to them
 * DOMContentLoaded taken from Love-Math Project
 */
document.addEventListener("DOMContentLoaded", function() {
    let startBtn = document.getElementById("start-btn");
    startBtn.addEventListener('click', () => {
        startGameBtn();
    });
});

function startGameBtn() {
    let startView = document.getElementById('start-games');
    let preQuizView = document.getElementById('pre-quiz-view');
    startView.classList.add("hide");
    preQuizView.classList.remove("hide");
}

// ----------- Modal Instruction ----------- //
// Studied on W3 School I have customized and created my own code for my needs
// When the user clicks on the button, open the modal
if (anchorInstruction != null){
    anchorInstruction.addEventListener('click', openInstruction);
}

function openInstruction(event) {
    event.preventDefault();
    let startView = document.getElementById('start-games');

    modalInstruction.style.display = "flex";
    startView.classList.add("hide");
    header.classList.add("hide");
    footer.classList.add("hide");
}

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
// ----------- End Modal ----------- //


// ----------- Quiz Engine ----------- //
// Variables Quiz
window.availableQuestion = [];

const POINTS = 100;
const MAX_QUESTIONS = 10;
const moviesQuestions = document.getElementById('movies-btn');
const videogamesQuestions = document.getElementById('videogames-btn');

let questionElement = document.getElementById('question-text');
let answersElement = Array.from(document.querySelectorAll('.answer-text'));
let progress = document.getElementById('progress');
let progressFull = document.getElementById('progress-full');
let scoreText = document.getElementById('score');
let username = document.getElementById('username');

let currentQuestion = {};
let countDown = null;
let score = 0;
let questionCounter = 0;

/**
 * Local Storage Setup for Username, Score and Difficulty
 * Content Studied on W3 School and code custom by me for my needs
 */
// Local Storage Setup for recentScore
let recentScore = localStorage.getItem('recentScore');

// Local Storage Setup for Username
const storedUsername = localStorage.getItem('inputUsername');
let playerName = storedUsername || "";

if (username) {
    username.value = storedUsername;
}

username.addEventListener('change', user => {
    playerName = user.target.value;
});

const saveLocalUsername = () => {
    localStorage.setItem('inputUsername', playerName);
};

// Local Storage Setup Difficulty Radio Buttons
const saveLocalDifficulty = () => {
    let inputRadio = document.querySelector('input[name="level_speed"]:checked');
    localStorage.setItem('inputDifficulty', inputRadio.value);
};
// End Local Storage Setup

// Check Validation Form
function checkValidationForm() {
    let inputRadio = document.querySelector('input[name="level_speed"]:checked');
    let inputUsername = document.getElementById('username');
    let isValid = (inputUsername.value !== "" && inputRadio !== null);
    return isValid;
}

// Function created to visualize the Quiz Area
function modeQuiz() {
    let startView = document.getElementById('start-games');
    let preQuizView = document.getElementById('pre-quiz-view');
    let questionView = document.getElementById('quiz-view');
    startView.classList.add("hide");
    preQuizView.classList.add('hide');
    questionView.classList.remove('hide');
}

// Check if username as been filled in before to start the Movies quiz
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

// Check if username as been filled in before to start the Videogames quiz
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

// Function to get new questions using => arrow function
// Inspiration on how to create a Quiz from Brian Design and Web Dev Simplfied
const getQuestion = () => {
    if(window.availableQuestion.length === 0 || questionCounter === MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score);
    
        return window.location.replace('quiz-score.html?open=endgame');
    }

    startTimer();
    questionCounter++;
    progress.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    progressFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

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
};


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
            }, 1500);
        });
    });
}

// ------------- Increment Score ------------- //
let incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};
// ------------- End Increment Score ------------- //

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

function stopTimer() {
    if (countDown !== null) {
        clearInterval(countDown);
    }
}
// ------------- End Timer ------------- //

// ------------- Function Disable Buttons -------------- //
function disableAnswersBtns(isDisabled) {
    answersElement.forEach(answer => {
        answer.disabled = isDisabled;
    });
}
// ------------- End Function Disable Buttons -------------- //