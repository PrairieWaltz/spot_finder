'use strict';

// const Spot = require('../models/spot');
const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
  res.render('users/register');
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const rergisteredUser = await User.register(user, password);
    req.login(rergisteredUser, err => {
      const userName = req.body.username;
      if (err) return next(err);
      req.flash('success', `Welcome to SpotFinder ${userName}!`);
      res.redirect('/spots');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render('users/login');
};

module.exports.userLogin = (req, res) => {
  const userName = req.body.username;
  req.flash('success', `Welcome Back ${userName}!`);
  const redirectUrl = req.session.returnTo;
  delete req.session.returnTo;
  res.redirect(redirectUrl || '/spots');
};

module.exports.logoutRoute = (req, res, next) => {
  const userName = req.body.username;
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.flash('success', `Go skate...your work here is done`);
    res.redirect('/');
  });
};
