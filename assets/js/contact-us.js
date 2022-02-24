// ------------- Contact Us ------------- //
// ------------- Variables ------------- //
let userComment = document.getElementById('user-comment');
let radioTextArea = document.querySelectorAll('input[type=radio][name="form_nfrb"]');

// ------------- Textarea Functionality ------------- //
for (let radio of radioTextArea) {
        radio.addEventListener("change", function() {
            if (this.value === "newsletter") {
                userComment.classList.add('hide');
            } else if (this.value === 'feedback'){
                userComment.classList.remove('hide');
            } else if (this.value === 'report'){
                userComment.classList.remove('hide');
            } else {
                userComment.classList.remove('hide');
            }
        })
}