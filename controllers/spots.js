'use strict';

const Spot = require('../models/spot');

module.exports.index = async (req, res, next) => {
  const spots = await Spot.find({});
  res.render('spots/index', { spots });
};

module.exports.renderNewForm = (req, res) => {
  res.render('spots/new');
};

module.exports.createNewSpot = async (req, res, next) => {
  // if (!req.body.spot) throw new ExpressError('Invalid Spot Data', 400);
  const spot = new Spot(req.body.spot);
  spot.author = req.user._id;
  await spot.save();
  req.flash('success', 'You made a new Spot!!');
  res.redirect(`/spots/${spot._id}`);
};

module.exports.showSpot = async (req, res) => {
  const spot = await Spot.findById(req.params.id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('author');
  // console.log(spot);
  if (!spot) {
    req.flash('error', 'Sorry, cant find that spot.');
    return res.redirect('/spots');
  }
  res.render('spots/show', { spot });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const spot = await Spot.findById(id);
  if (!spot) {
    req.flash('error', 'Can not find Spot');
    return res.redirect('/spots');
  }
  res.render('spots/edit', { spot });
};

module.exports.updateEditForm = async (req, res) => {
  const { id } = req.params;
  const spot = await Spot.findByIdAndUpdate(id, { ...req.body.spot });
  req.flash('success', 'You updated this spot!');
  res.redirect(`/spots/${spot._id}`);
};

module.exports.deleteSpot = async (req, res) => {
  const { id } = req.params;
  await Spot.findByIdAndDelete(id);
  req.flash('success', 'You deleted a spot!');
  res.redirect('/spots');
};
