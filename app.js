'use strict';

const { clearCache } = require('ejs');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Spot = require('./models/spot');

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

const app = express();

// VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// APP.USE NEEDS
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.use('/Images', express.static('Images'));

// HOME Route
app.get('/', (req, res) => {
  res.render('home');
});

// ALL SPOTS Route
app.get('/spots', async (req, res) => {
  const spots = await Spot.find({});
  res.render('spots/index', { spots });
});

// NEW SPOT Route
app.get('/spots/new', (req, res) => {
  res.render('spots/new');
});

app.post('/spots', async (req, res) => {
  const spot = new Spot(req.body.spot);
  await spot.save();
  res.redirect(`/spots/${spot._id}`);
});

// SINGLE SPOT Route
app.get('/spots/:id', async (req, res) => {
  const spot = await Spot.findById(req.params.id);
  res.render('spots/show', { spot });
});

app.get('/spots/:id/edit', async (req, res) => {
  const spot = await Spot.findById(req.params.id);
  res.render('spots/edit', { spot });
});

// Serving on
app.listen(3000, () => {
  console.log('Loud & Clear on PORT 3000');
});
