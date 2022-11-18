'use strict';

const { clearCache } = require('ejs');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { spotSchema, reviewSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Spot = require('./models/spot');
const Review = require('./models/review');

// Mongoose Connections
mongoose.connect('mongodb://localhost:27017/spot-finder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected');
});

// ROUTER SET
const app = express();

// VIEW ENGINE
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// APP.USE NEEDS
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// STATIC APP ROUTES
app.use('/public', express.static('public'));
app.use('/Images', express.static('Images'));

// JOI VALIDATION
const validateSpot = (req, res, next) => {
  const { error } = spotSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// HOME Route
app.get('/', (req, res) => {
  res.render('home');
});

// ALL SPOTS Route
app.get(
  '/spots',
  catchAsync(async (req, res, next) => {
    const spots = await Spot.find({});
    res.render('spots/index', { spots });
  })
);

// NEW SPOT Route
app.get('/spots/new', (req, res) => {
  res.render('spots/new');
});

app.post(
  '/spots',
  validateSpot,
  catchAsync(async (req, res, next) => {
    // if (!req.body.spot) throw new ExpressError('Invalid Spot Data', 400);
    const spot = new Spot(req.body.spot);
    await spot.save();
    res.redirect(`/spots/${spot._id}`);
  })
);

// SINGLE SPOT Route
app.get(
  '/spots/:id',
  catchAsync(async (req, res) => {
    const spot = await Spot.findById(req.params.id).populate('reviews');
    res.render('spots/show', { spot });
  })
);

// SINGLE SPOT EDIT Route
app.get(
  '/spots/:id/edit',
  catchAsync(async (req, res) => {
    const spot = await Spot.findById(req.params.id);
    res.render('spots/edit', { spot });
  })
);

// UPDATE EDITED SPOT PUT Route
app.put(
  '/spots/:id',
  validateSpot,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findByIdAndUpdate(id, { ...req.body.spot });
    res.redirect(`/spots/${spot._id}`);
  })
);

// SINGLE SPOT REVIEW ROUTE
app.post(
  '/spots/:id/reviews',
  validateReview,
  catchAsync(async (req, res) => {
    const spot = await Spot.findById(req.params.id);
    const review = new Review(req.body.review);
    spot.reviews.push(review);
    await review.save();
    await spot.save();
    res.redirect(`/spots/${spot._id}`);
  })
);

// SINGLE REVIEW DELETE ROUTE
app.delete(
  '/spots/:id/reviews/:reviewId',
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Spot.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/spots/${id}`);
  })
);

// SINGLE SPOT DELETE Route
app.delete(
  '/spots/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Spot.findByIdAndDelete(id);
    res.redirect('/spots');
  })
);

// GENERAL UNKNOWN ROUTE ERROR HANDLING
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

// ERROR HANDLING BASIC
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oops, something went wrong';
  res.status(statusCode).render('error', { err });
});

// Serving on
app.listen(3000, () => {
  console.log('Loud & Clear on PORT 3000');
});
