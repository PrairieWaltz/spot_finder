'use strict';

const reviewForm = document.getElementById('review-form');
const editSpotReview = document.getElementById('body');

reviewForm.addEventListener('click', e => {
  checkInputs();
});

function checkInputs() {
  const editSpotReviewContent = editSpotReview.value.trim();
  const reviewSubmitButton = document.getElementById('review-submit-btn');

  if (editSpotReviewContent === '') {
    setErrorFor(editSpotReview, 'Review can not be blank');
    reviewSubmitButton.disabled = true;
  } else {
    setSuccessFor(editSpotReview, 'Looks Good');
    reviewSubmitButton.disabled = false;
  }
}

// add success message inside <small> input
function setSuccessFor(input, message) {
  const formControl = input.parentElement; // parent is .form-control
  const small = formControl.querySelector('small');

  small.innerText = message;
  // add error class
  formControl.className = 'form-control-review success';
}

// add error message inside <small> input
function setErrorFor(input, message) {
  const formControl = input.parentElement; // parent is .form-control
  const small = formControl.querySelector('small');

  small.innerText = message;
  // add success class
  formControl.className = 'form-control-review error';
}
