'use strict';

const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateSpot } = require('../middlewear');

const Spot = require('../models/spot');

// ALL SPOTS Route
router.get(
  '/',
  catchAsync(async (req, res, next) => {
    const spots = await Spot.find({});
    res.render('spots/index', { spots });
  })
);

// NEW SPOT Route
router.get('/new', isLoggedIn, (req, res) => {
  res.render('spots/new');
});

router.post(
  '/',
  isLoggedIn,
  validateSpot,
  catchAsync(async (req, res, next) => {
    // if (!req.body.spot) throw new ExpressError('Invalid Spot Data', 400);
    const spot = new Spot(req.body.spot);
    spot.author = req.user._id;
    await spot.save();
    req.flash('success', 'You made a new Spot!!');
    res.redirect(`/spots/${spot._id}`);
  })
);

// SINGLE SPOT Route
router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const spot = await Spot.findById(req.params.id)
      .populate('reviews')
      .populate('author');
    console.log(spot);
    if (!spot) {
      req.flash('error', 'Sorry, cant find that spot.');
      return res.redirect('/spots');
    }
    res.render('spots/show', { spot });
  })
);

// SINGLE SPOT EDIT Route
router.get(
  '/:id/edit',
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findById(id);
    if (!spot) {
      req.flash('error', 'Can not find Spot');
      return res.redirect('/spots');
    }
    res.render('spots/edit', { spot });
  })
);

// UPDATE EDITED SPOT PUT Route
router.put(
  '/:id',
  isLoggedIn,
  isAuthor,
  validateSpot,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findByIdAndUpdate(id, { ...req.body.spot });
    req.flash('success', 'You updated this spot!');
    res.redirect(`/spots/${spot._id}`);
  })
);

// SINGLE SPOT DELETE Route
router.delete(
  '/:id',
  isLoggedIn,
  isAuthor,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Spot.findByIdAndDelete(id);
    req.flash('success', 'You deleted a spot!');
    res.redirect('/spots');
  })
);

module.exports = router;
