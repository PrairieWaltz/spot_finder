'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpotSchema = new Schema({
  title: String,
  image: String,
  // type: String,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

module.exports = mongoose.model('Spot', SpotSchema);
