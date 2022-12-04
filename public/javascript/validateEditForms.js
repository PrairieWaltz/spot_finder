'use strict';

const editForm = document.getElementById('edit-form');
const editSpotName = document.getElementById('edit-title');
const editSpotImage = document.getElementById('edit-image');
const editSpotLocation = document.getElementById('edit-location');
const editSpotDescription = document.getElementById('edit-description');
const editUpdateButton = document.getElementById('edit-button');

editForm.addEventListener('click', e => {
  checkInputs();
});

function checkInputs() {
  const editSpotnameTitle = editSpotName.value.trim();
  const editSpotnameImage = editSpotImage.value.trim();
  const editSpotnameLocation = editSpotLocation.value.trim();
  const editSpotnameDescription = editSpotDescription.value.trim();
  const editUpdateButton = document.getElementById('edit-button');

  if (editSpotnameTitle === '') {
    setErrorFor(editSpotName, 'Name can not be blank');
    editUpdateButton.disabled = true;
  } else {
    setSuccessFor(editSpotName, 'Looks Good');
    editUpdateButton.disabled = false;
  }

  // DISABLED FOR EDIT PAGE ONLY
  // if (editSpotnameImage === '') {
  //   setErrorFor(editSpotImage, 'Image Url can not be blank');
  //   editUpdateButton.disabled = true;
  // } else {
  //   setSuccessFor(editSpotImage, 'Looks Good');
  // }

  if (editSpotnameLocation === '') {
    setErrorFor(editSpotLocation, 'Location can not be blank');
    editUpdateButton.disabled = true;
  } else {
    setSuccessFor(editSpotLocation, 'Looks Good');
  }

  if (editSpotnameDescription === '') {
    setErrorFor(editSpotDescription, 'Description can not be blank');
    editUpdateButton.disabled = true;
  } else {
    setSuccessFor(editSpotDescription, 'Looks Good');
  }
}

// add success message inside <small> input
function setSuccessFor(input, message) {
  const formControl = input.parentElement; // parent is .form-control
  const small = formControl.querySelector('small');

  small.innerText = message;
  // add error class
  formControl.className = 'form-control-edit success';
}

// add error message inside <small> input
function setErrorFor(input, message) {
  const formControl = input.parentElement; // parent is .form-control
  const small = formControl.querySelector('small');

  small.innerText = message;
  // add success class
  formControl.className = 'form-control-edit error';
}
