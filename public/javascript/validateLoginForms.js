'use strict';

const form = document.getElementById('login-form');
const userNameLogin = document.getElementById('login-username');
const passwordLogin = document.getElementById('login-password');
const submitButton = document.getElementById('login-submit');

form.addEventListener('click', e => {
  checkInputs();
});

function checkInputs() {
  const userNameLoginCheck = userNameLogin.value.trim();
  const passwordLoginCheck = passwordLogin.value.trim();
  const submitButtonLogin = document.getElementById('login-submit');

  if (userNameLoginCheck === '') {
    setErrorFor(userNameLogin, 'Username can not be blank');
    submitButtonLogin.disabled = true;
  } else {
    setSuccessFor(userNameLogin, 'Looks Good');
    submitButtonLogin.disabled = false;
  }

  if (passwordLoginCheck === '') {
    setErrorFor(passwordLogin, 'Password can not be blank');
    submitButtonLogin.disabled = true;
  } else {
    setSuccessFor(passwordLogin, 'Looks Good');
  }
}

// add success message inside <small> input
function setSuccessFor(input, message) {
  const formControl = input.parentElement; // parent is .form-control
  const small = formControl.querySelector('small');

  small.innerText = message;
  // add error class
  formControl.className = 'form-control success';
}

// add error message inside <small> input
function setErrorFor(input, message) {
  const formControl = input.parentElement; // parent is .form-control
  const small = formControl.querySelector('small');

  small.innerText = message;
  // add success class
  formControl.className = 'form-control error';
}
