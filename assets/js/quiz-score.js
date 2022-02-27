// ------------- Display Score ------------- //
let finalScore = document.getElementById('quiz-final-score-value');
let recentScore = localStorage.getItem('recentScore');

finalScore.innerText = recentScore;
// ------------- End Display Score ------------- //
