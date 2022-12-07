'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { clearCache } = require('ejs');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');

const mongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/users');
const spotRoutes = require('./routes/spots');
const reviewRoutes = require('./routes/reviews');

// MONGOOSE
mongoose.connect('mongodb://localhost:27017/spot-finder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected');
});

//
const app = express();

// VIEW ENGINE
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// STATIC ROUTES
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/Images', express.static('Images'));

// Mongo-Sanitize
app.use(mongoSanitize());

// SESSION
const sessionConfig = {
  name: 'popshuvonly',
  secret: 'simplesecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 14,
    maxAge: 1000 * 60 * 60 * 24 * 14,
  },
};
app.use(session(sessionConfig));
app.use(flash());
// app.use(helmet());

const scriptSrcUrls = [
  'https://api.tiles.mapbox.com/',
  'https://api.mapbox.com/',
  'https://cdnjs.cloudflare.com/',
  'https://cdn.jsdelivr.net',
  'https://kit.fontawesome.com/',
  'https://kit.fontawesome.com/8a592e980d.js',
  'https://res.cloudinary.com/dxgtndosr/',
];
const styleSrcUrls = [
  'https://kit.fontawesome.com/8a592e980d.js',
  'https://kit-free.fontawesome.com/',
  'https://use.fontawesome.com/',
  'https://api.mapbox.com/',
  'https://api.tiles.mapbox.com/',
  'https://fonts.googleapis.com/',
  'https://fonts.gstatic.com',
  'https://use.fontawesome.com/',
  'https://cdn.jsdelivr.net',
];
const connectSrcUrls = [
  'https://api.mapbox.com/',
  'https://a.tiles.mapbox.com/',
  'https://b.tiles.mapbox.com/',
  'https://events.mapbox.com/',
];
const fontSrcUrls = ['https://res.cloudinary.com/dxgtndosr/'];
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [],
      connectSrc: ["'self'", ...connectSrcUrls],
      scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
      styleSrc: ["'self'", ...styleSrcUrls],
      workerSrc: ["'self'", 'blob:'],
      childSrc: ["'self'", 'blob:'],
      objectSrc: [],
      imgSrc: [
        "'self'",
        "'blob:'",
        "'data:'",
        'https://res.cloudinary.com/dxgtndosr/',
      ],
      fontSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com'],
    },
  })
);

// PASSPORT Config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// FLASH Middlewear
app.use((req, res, next) => {
  console.log(req.query);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// ROUTES
app.use('/', userRoutes);
app.use('/spots', spotRoutes);
app.use('/spots/:id/reviews', reviewRoutes);

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
