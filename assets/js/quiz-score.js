// ------------- Display Score & Text ------------- //
let finalScore = document.getElementById('quiz-final-score-value');
let recentScore = localStorage.getItem('recentScore');
let inputUsername = localStorage.getItem('inputUsername');
let textEndGame = document.getElementById('end-game');

if (recentScore <= 300) {
    textEndGame.innerHTML = `
    <h2 class="final-text text-center">Hi ${inputUsername}!</h2>
    <p class="final-text text-center">Thanks for playing! Your are a Noob! Score is too low! Play again!</p>
    <h2 class="final-text text-center">Your Score: </h2>
    <span id="quiz-final-score-value" class="final-score text-center"> ${recentScore}</span>
    `;   
} else if (recentScore > 301 && recentScore <= 600) {
    textEndGame.innerHTML = `
    <h2 class="final-text text-center">Hi ${inputUsername}! </h2>
    <p class="final-text text-center">Thanks for playing! Good Score but you can do more! Play again!</p>
    <h2 class="final-text text-center">Final Score: </h2>
    <span id="quiz-final-score-value" class="final-score text-center"> ${recentScore}</span>
    `;
} else if (recentScore > 601 && recentScore <= 1000) {
    textEndGame.innerHTML = `
    <h2 class="final-text text-center">Hi ${inputUsername}! </h2>
    <p class="final-text text-center">Thanks for playing! Your are amazing! Worderfull Score! Play again!</p>
    <h2 class="final-text text-center">Final Score: </h2>
    <span id="quiz-final-score-value" class="final-score text-center"> ${recentScore}</span>
    `;
} else {
    textEndGame.innerHTML = `
    <h2 class="final-text text-center">Hi ${inputUsername}!</h2>
    <p class="final-text text-center">Play again!</p>
    <h2 class="final-text text-center">Final Score: </h2>
    <span id="quiz-final-score-value" class="final-score text-center"> ${recentScore}</span>
    `;
}
// ------------- End Display Score & Text ------------- //


// ------------- API LeaderBoard ------------- //
