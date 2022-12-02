'use strict';

const express = require('express');
const router = express.Router();
const spots = require('../controllers/spots');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateSpot } = require('../middlewear');

const Spot = require('../models/spot');

// ALL spots and redirect after NEW
router
  .route('/')
  .get(catchAsync(spots.index))
  .post(isLoggedIn, validateSpot, catchAsync(spots.createNewSpot));

// NEW SPOT Routes
router.get('/new', isLoggedIn, spots.renderNewForm);

// SHOW, EDIT send and DELETE
router
  .route('/:id')
  .get(catchAsync(spots.showSpot))
  .put(isLoggedIn, isAuthor, validateSpot, catchAsync(spots.updateEditForm))
  .delete(isLoggedIn, isAuthor, catchAsync(spots.deleteSpot));

// EDIT Spot Routes
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(spots.renderEditForm));

module.exports = router;
