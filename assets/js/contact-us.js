// ------------- Contact Us ------------- //
// ------------- Variables ------------- //
let radioTextArea = document.querySelectorAll('input[type=radio][name="form_nfrb"]');
let resetBtn = document.getElementById('btn-reset');

// ------------- Show Textarea Functionality ------------- //
function showTextArea() {
    for (let radio of radioTextArea) {
        radio.addEventListener('change', function () {
            let userComment = document.getElementById('user-comment');
            switch (this.value) {
                case 'newsletter':
                    userComment.classList.add('hide');
                    break;
                case 'feedback':
                case 'report':
                    userComment.classList.remove('hide');
                    break;
                default:
                    userComment.classList.remove('hide');
            }
        });
    }  
}

function hideTextArea() {
    let userComment = document.getElementById('user-comment');
    resetBtn.addEventListener('click', function () {
        userComment.classList.add('hide');
    });
}

// Bind the page load event
document.addEventListener('DOMContentLoaded', showTextArea);
document.addEventListener('DOMContentLoaded', hideTextArea);