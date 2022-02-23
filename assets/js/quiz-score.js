let username = document.getElementById('username');
let finalScore = document.getElementsByClassName('final-score');
let recentScore = localStorage.getItem('recentScore');
let saveScore = document.getElementById('save-score');

let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 10;

finalScore.innerText = recentScore;

saveHighScore = event => {
    event.preventDefault()

    let score = {
        score: recentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort ((a,b) => {
    return b.score - a.score 
    })

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/')
}


let highScoresList = document.getElementById('high-score');
//let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score"> ${score.name} - ${score.score}`
}).join('')