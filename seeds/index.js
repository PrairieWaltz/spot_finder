'use strict';

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Spot = require('../models/spot');

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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Spot.deleteMany({});
  for (let i = 0; i < 6; i++) {
    const random5 = Math.floor(Math.random() * 5);
    const spot = new Spot({
      author: '6384f0ce69f8222e0d6aa124',
      location: `${cities[random5].city}, ${cities[random5].state}`,
      title: `${cities[random5].title}`,
      description: `${cities[random5].description}`,
      image:
        'https://sportshub.cbsistatic.com/i/r/2020/05/28/1573c82d-344a-43aa-9906-d03551f22650/thumbnail/1200x675/03db8618edc6039b9db21b3d646d31de/venice-beach-skate-park.jpg',
    });
    await spot.save();
  }
};

seedDB().then(() => mongoose.connection.close());
