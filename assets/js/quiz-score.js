// ------------- Variables Display Score & Text ------------- //
let finalScore = document.getElementById('quiz-final-score-value');
let recentScore = localStorage.getItem('recentScore');
let inputUsername = localStorage.getItem('inputUsername');
let inputDifficulty = localStorage.getItem('inputDifficulty');
// -------------- Variables Scores Text & Leaderboard -------------- //
let scoresView = document.getElementById('high-scores');
let textEndGame = document.getElementById('end-game-text');

// ------------- Display Score & Text ------------- //
const btnYesNo = `
    <div class="flex-containers flex-center space-margin-bottom">
        <h2 class="final-text text-center">Do you want to save your Score?</h2>
        <button id="save-score-btn-yes" class="btn btn-games text-center text-small" type="submit">Yes</button>
        <button id="save-score-btn-no" class="btn btn-games text-center text-small" type="submit">No</button>
    </div>
    `; 

const textScore = `
    <h2 class="final-text text-center">Hi ${inputUsername}!</h2>
    <div class="flex-containers flex-center">
        <p class="final-text text-center">Your Score: 
        <span id="quiz-final-score-value" class="final-score text-center"> ${recentScore}</span></p>
    </div>
    `;

if (recentScore <= 300) {
    textEndGame.innerHTML = `
    ${textScore}
    <p class="final-text text-center space-margin-bottom">Thanks for playing! Your are a Noob! The score is too low! Play again!</p>
    ${btnYesNo}`;   
} else if (recentScore > 301 && recentScore <= 600) {
    textEndGame.innerHTML = `
    ${textScore}
    <p class="final-text text-center space-margin-bottom">Thanks for playing! Good score but you can do better! Play again!</p>
    ${btnYesNo}`;
} else if (recentScore > 601 && recentScore <= 1000) {
    textEndGame.innerHTML = `
    ${textScore}
    <p class="final-text text-center space-margin-bottom">Thanks for playing! Your are amazing! Worderful score! Play again!</p>
    ${btnYesNo}`;
} else {
    textEndGame.innerHTML = `
    ${textScore}
    <p class="final-text text-center space-margin-bottom">Play again!</p>
    ${btnYesNo}`;
}
// ------------- End Display Score & Text ------------- //

// ------------- API LeaderBoard ------------- //
// Studied on Code Institute Course (Introduction to APIs)
// Integration Documentation RestDB.io
const API_URL = "https://quizforfundb-d21e.restdb.io/rest/quiz-for-fun";
const API_KEY = "621d964834fd621565858a7b";
const LIMIT_SCORES = 10;
// Reference Code from Stackoverflow modified by me for my needs
const urlParams = new URLSearchParams(window.location.search);
const requestOpenScore = urlParams.get('open');

console.log('Type of request:', requestOpenScore);

// Check if "open" has been requested and will start the function
if (requestOpenScore == 'score') {
    displayScoreView();
    getStatus();
} else if (requestOpenScore == 'endgame'){
    displayEndGameText();
}

document.getElementById("save-score-btn-no").addEventListener("click", () => getStatus());
document.getElementById("save-score-btn-yes").addEventListener("click", () => saveAndGetStatus());
document.getElementById("anchor-score").addEventListener("click", () => getStatus());

// Function to display the Result to the User
function displayEndGameText() {
    scoresView.classList.add("hide");
    textEndGame.classList.remove("hide");
}

// Function to display the Score to the User
function displayScoreView() {
    scoresView.classList.remove("hide");
    textEndGame.classList.add("hide");
}

// Get the Score from the DB and display it
async function getStatus() {
    displayScoreView();

    const headers = { 
        'cache-control': 'no-cache',
        'x-apikey': API_KEY
    };

    const requestOptions = {
        method: "GET",
        headers: headers,
    };

    const response = await fetch(API_URL+`?max=${LIMIT_SCORES}&h={"$orderby": {"score": -1}}`, requestOptions);

    const data = await response.json();
    
    if (response.ok) {
        displayScore(data);
    } else {
        console.log('No Score Available');
        throw new Error(data.error);
    }
}

function saveAndGetStatus() {
    saveStatus(inputUsername, recentScore, inputDifficulty, 'movies');
    displayScoreView();
    setTimeout(getStatus, 2000);
}

async function saveStatus(username, score, difficulty, category) {
    const headers = { 
        'cache-control': 'no-cache',
        'x-apikey': API_KEY, 
        'content-type': 'application/json'
    };

    const objBody = {
        username: username,
        score: score,
        difficulty: difficulty,
        category: category
    };

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(objBody)
    };

    const response = await fetch(API_URL, requestOptions);

    const data = await response.json();

    if (response.ok) {
        console.log(data);
    } else {
        console.log('Error... No Score Saved');
        throw new Error(data.error);
    }
}

async function displayScore(data) {
    let rowsLeaderboard = document.getElementById('rows-leaderboard');
    // Required to clean and then print table again
    rowsLeaderboard.innerHTML = "";
    
    data.forEach((element, i) => {
        rowsLeaderboard.innerHTML += `<tr>
        <td>${i+1}.</td>
        <td>${element.username}</td>
        <td><span class="text-capitalize">${element.difficulty}</span></td>
        <td>${element.score}</td>
        </tr>`;
    });  
}

