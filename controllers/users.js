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
      if (err) return next(err);
      req.flash('success', 'Welcome to SpotFinder');
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
  req.flash('success', 'Welcome Back!');
  const redirectUrl = req.session.returnTo;
  delete req.session.returnTo;
  res.redirect(redirectUrl || '/spots');
};

module.exports.logoutRoute = (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Goodbye');
    res.redirect('/');
  });
};
