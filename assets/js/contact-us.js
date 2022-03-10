// ------------- Contact Us ------------- //
// ------------- Variables ------------- //
let userComment = document.getElementById('user-comment');
let radioTextArea = document.querySelectorAll('input[type=radio][name="form_nfrb"]');
let resetBtn = document.getElementById('btn-reset');

// ------------- Show Textarea Functionality ------------- //
function showTextArea() {
    for (let radio of radioTextArea) {
        radio.addEventListener("change", function () {
            if (this.value === "newsletter") {
                userComment.classList.add('hide');
            } else if (this.value === 'feedback') {
                userComment.classList.remove('hide');
            } else if (this.value === 'report') {
                userComment.classList.remove('hide');
            } else {
                userComment.classList.remove('hide');
            }
        });
    }  
}

function hideTextArea() {
    resetBtn.addEventListener('click', function () {
        userComment.classList.add('hide');
    })
}

// Bind the page load event
document.addEventListener('DOMContentLoaded', showTextArea);
document.addEventListener('DOMContentLoaded', hideTextArea);

