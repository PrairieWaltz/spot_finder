'use strict';

const form = document.getElementById('new-form');
const spotName = document.getElementById('title');
const spotImage = document.getElementById('image');
const spotLocation = document.getElementById('location');
const spotDescription = document.getElementById('description');
const submitButton = document.getElementById('new-submit');

form.addEventListener('click', e => {
  checkInputs();
});

function checkInputs() {
  const spotnameTitle = spotName.value.trim();
  const spotnameImage = spotImage.value.trim();
  const spotnameLocation = spotLocation.value.trim();
  const spotnameDescription = spotDescription.value.trim();
  const submitButton = document.getElementById('new-submit');

  if (spotnameTitle === '') {
    setErrorFor(spotName, 'Name can not be blank');
    submitButton.disabled = true;
  } else {
    setSuccessFor(spotName, 'Looks Good');
    submitButton.disabled = false;
  }

  if (spotnameImage === '') {
    setErrorFor(spotImage, 'Image Url can not be blank');
    submitButton.disabled = true;
  } else {
    setSuccessFor(spotImage, 'Looks Good');
  }

  if (spotnameLocation === '') {
    setErrorFor(spotLocation, 'Location can not be blank');
    submitButton.disabled = true;
  } else {
    setSuccessFor(spotLocation, 'Looks Good');
  }

  if (spotnameDescription === '') {
    setErrorFor(spotDescription, 'Description can not be blank');
    submitButton.disabled = true;
  } else {
    setSuccessFor(spotDescription, 'Looks Good');
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
