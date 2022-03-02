// ------------- Display Score & Text ------------- //
let finalScore = document.getElementById('quiz-final-score-value');
let recentScore = localStorage.getItem('recentScore');
let inputUsername = localStorage.getItem('inputUsername');
let textEndGame = document.getElementById('end-game');

const btnYesNo = `
    <h2>Do you want to save your Score?</h2>
    <button id="save-score-btn-yes" class="btn-games" type="submit">Yes</button>
    <button id="save-score-btn-no" class="btn-games" type="submit">No</button>
    `; 

const textFinalScore = `
    <h2 class="final-text text-center">Hi ${inputUsername}!</h2>
    <h2 class="final-text text-center">Your Score: </h2>
    <span id="quiz-final-score-value" class="final-score text-center"> ${recentScore}</span>
    `;

if (recentScore <= 300) {
    textEndGame.innerHTML = `
    ${textFinalScore}
    <p class="final-text text-center">Thanks for playing! Your are a Noob! Score is too low! Play again!</p>
    ${btnYesNo}`;   
} else if (recentScore > 301 && recentScore <= 600) {
    textEndGame.innerHTML = `
    ${textFinalScore}
    <p class="final-text text-center">Thanks for playing! Good Score but you can do more! Play again!</p>
    ${btnYesNo}`;
} else if (recentScore > 601 && recentScore <= 1000) {
    textEndGame.innerHTML = `
    ${textFinalScore}
    <p class="final-text text-center">Thanks for playing! Your are amazing! Worderfull Score! Play again!</p>
    ${btnYesNo}`;
} else {
    textEndGame.innerHTML = `
    ${textFinalScore}
    <p class="final-text text-center">Play again!</p>
    ${btnYesNo}`;
}
// ------------- End Display Score & Text ------------- //


// ------------- API LeaderBoard ------------- //
const API_URL = "https://quizforfundb-d21e.restdb.io/rest/quiz-for-fun";
const API_KEY = "621d964834fd621565858a7b";
const LIMIT_SCORES = 5;

document.getElementById("save-score-btn-no").addEventListener("click", () => getStatus());
document.getElementById("save-score-btn-yes").addEventListener("click", () => saveAndGetStatus());

async function getStatus() {
    const headers = { 
        'cache-control': 'no-cache',
        'x-apikey': API_KEY
    }

    const requestOptions = {
        method: "GET",
        headers: headers,
    }

    const response = await fetch(API_URL+`?max=${LIMIT_SCORES}&h={"$orderby": {"score": -1}}`, requestOptions);

    const data = await response.json();

    if (response.ok) {
        displayScore(data);
    } else {
        console.log('No Score Available')
        throw new Error(data.error);
    }
    
}


function saveAndGetStatus() {
    saveStatus(inputUsername, recentScore, 'hard', 'movies')
    setTimeout(getStatus, 2000)
}


async function saveStatus(username, score, difficulty, category) {
    const headers = { 
        'cache-control': 'no-cache',
        'x-apikey': API_KEY, 
        'content-type': 'application/json'
    }

    const objBody = {
        username: username,
        score: score,
        difficulty: difficulty,
        category: category
    }

    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(objBody)
    }

    const response = await fetch(API_URL, requestOptions);

    const data = await response.json();

    if (response.ok) {
        console.log(data);
    } else {
        console.log('Error... No Score Saved')
        throw new Error(data.error);
    }
    
}


async function displayScore(data) {
    let rowsLeaderboard = document.getElementById('rows-leaderboard');
    
    data.forEach((element, i) => {
        rowsLeaderboard.innerHTML += `<tr>
        <td> ${i+1}.</td>
        <td> ${element.username}</td>
        <td> ${element.difficulty}</td>
        <td> ${element.score}</td>
        </tr>`
    })   
}

