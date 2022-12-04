'use strict';

const express = require('express');
const router = express.Router();
const spots = require('../controllers/spots');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateSpot } = require('../middlewear');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Spot = require('../models/spot');

// ALL spots and redirect after NEW
router
  .route('/')
  .get(catchAsync(spots.index))
  .post(
    isLoggedIn,
    upload.array('image'),
    validateSpot,
    catchAsync(spots.createNewSpot)
  );

// NEW SPOT Routes
router.get('/new', isLoggedIn, spots.renderNewForm);

// SHOW, EDIT send and DELETE
router
  .route('/:id')
  .get(catchAsync(spots.showSpot))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
    validateSpot,
    catchAsync(spots.updateEditForm)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(spots.deleteSpot));

// EDIT Spot Routes
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(spots.renderEditForm));

module.exports = router;
