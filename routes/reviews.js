'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });

const Spot = require('../models/spot');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateReview } = require('../middlewear');

// SINGLE SPOT REVIEW ROUTE
router.post(
  '/',
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const spot = await Spot.findById(req.params.id);
    const review = new Review(req.body.review);
    spot.reviews.push(review);
    await review.save();
    await spot.save();
    req.flash('success', 'You posted a review!');
    res.redirect(`/spots/${spot._id}`);
  })
);

// SINGLE REVIEW DELETE ROUTE
router.delete(
  '/:reviewId',
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Spot.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'You deleted your review!');
    res.redirect(`/spots/${id}`);
  })
);

module.exports = router;
