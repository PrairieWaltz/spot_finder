'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middlewear');
// const Spot = require('../models/spot');
// const Review = require('../models/review');
// const { reviewSchema } = require('../schemas.js');
// const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

// SINGLE SPOT REVIEW ROUTE
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.reviewRoute));

// SINGLE REVIEW DELETE ROUTE
router.delete(
  '/:reviewId',
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
