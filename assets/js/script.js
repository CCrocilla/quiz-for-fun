 
// -----------> Home
//  Variables Home Page
let startBtn = document.getElementById('start-btn');
let startView = document.getElementById('start-games');
let quizView = document.getElementById('quiz-view');
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
            } else {
                alert("Something went wrong");
            }
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
let question = document.getElementById('question-text');
let answers = Array.from(document.querySelectorAll('.answer-text'));
let progress = document.getElementById('progress');
let progressFull = document.getElementById('progress-full');
let scoreText = document.getElementById('score');
let questionsView = document.getElementById('question-view');

let currentQuestion = {};
let trueAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let shuffleQuestion;

const moviesQuestions = document.getElementById('movies-btn')

// -----------> Questions
let questions = [
    {
        question: 'What my name?',
        answer1: 'Filippo',
        answer2: 'Claudio',
        answer3: 'James',
        answer4: 'Aristotele',
        correctAnswer: 2,
    },
    {
        question: 'What my surname?',
        answer1: 'Super',
        answer2:'Mega',
        answer3: 'Crocilla',
        answer4: 'Ferus',
        correctAnswer: 3,
    }
]  
// -----------> End Questions

const POINTS = 100;
const MAX_QUESTIONS = 2;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    /*if(availableQuestion.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score)

        return window.location.assign('/end-game.html');
    }*/

    questionCounter++;
    progress.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    // This will generate a random value from the questions
    let questionsIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionsIndex];
    question.innerText = currentQuestion.question

    //This is required for the possible answers
    answers.forEach(answer => {
        const number = answer.dataset['number'];
        answer.innerText = currentQuestion['answer' + number]   
    })

    availableQuestion.splice(questionsIndex, 1);

    trueAnswer = true;
}

// Run Event for each answer clicked.
answers.forEach(answer => {
    answer.addEventListener('click', event => {
        if(trueAnswer != true) return;

        let selectedChoice = event.target;
        let selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct-answer' : 'wrong-answer';

        if(classToApply === 'correct-answer') {
            incrementScore(POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
})

// Increment Score 
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}


startGame();