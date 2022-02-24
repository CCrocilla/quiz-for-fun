// ------------- Contact Us ------------- //
let userComment = document.getElementById('user-comment');
let radioTextArea = document.querySelectorAll('input[type=radio][name="form_nfrb"]:checked');
console.log(radioTextArea);

radioTextArea.addEventListener('change', function() {
    if (radioTextArea.value === 'newsletter'){
        userComment.classList.add('hide');
    } else if (radioTextArea.value === 'feedback'){
        userComment.classList.remove('hide');
    } else if (radioTextArea.value === 'report'){
        userComment.classList.remove('hide');
    } else {
        userComment.classList.remove('hide');
    }
});

