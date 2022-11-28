'use strict';

const form = document.getElementById('register-form');
const userName = document.getElementById('register-username');
const email = document.getElementById('register-email');
const password = document.getElementById('register-password');
const submitButton = document.getElementById('register-submit');

form.addEventListener('click', e => {
  checkInputs();
});

function checkInputs() {
  const usernameCheck = userName.value.trim();
  const emailCheck = email.value.trim();
  const passwordCheck = password.value.trim();
  const submitButtonRegister = document.getElementById('register-submit');

  if (usernameCheck === '') {
    setErrorFor(userName, 'Username can not be blank');
    submitButtonRegister.disabled = true;
  } else {
    setSuccessFor(userName, 'Looks Good');
    submitButtonRegister.disabled = false;
  }

  if (emailCheck === '') {
    setErrorFor(email, 'Email can not be blank');
    submitButtonRegister.disabled = true;
  } else {
    setSuccessFor(email, 'Looks Good');
  }

  if (passwordCheck === '') {
    setErrorFor(password, 'Password can not be blank');
    submitButtonRegister.disabled = true;
  } else {
    setSuccessFor(password, 'Looks Good');
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
