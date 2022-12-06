'use strict';

const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_150');
});

const SpotSchema = new Schema({
  title: String,
  images: [ImageSchema],

  geometry: {
    coordinates: {
      type: [Number],
      required: true,
    },
    type: {
      type: String,
      enum: ['Point'],
      // required: true,
    },
  },

  type: String,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

SpotSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model('Spot', SpotSchema);
