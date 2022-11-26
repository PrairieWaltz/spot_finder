'use strict';

const { clearCache } = require('ejs');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const spots = require('./routes/spots');
const reviews = require('./routes/reviews');

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

// APP EXTRAS
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// STATIC APP ROUTES
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/Images', express.static('Images'));

const sessionConfig = {
  secret: 'simplesecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 14,
  },
};
app.use(session(sessionConfig));

// SPOT ROUTES
app.use('/spots', spots);

// REVIEW ROUTES
app.use('/spots/:id/reviews', reviews);

// HOME Route
app.get('/', (req, res) => {
  res.render('home');
});

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
