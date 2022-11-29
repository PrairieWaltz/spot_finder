'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post(
  '/register',
  catchAsync(async (req, res, next) => {
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
  })
);

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    keepSessionInfo: true,
  }),
  (req, res) => {
    req.flash('success', 'Welcome Back!');
    const redirectUrl = req.session.returnTo;
    delete req.session.returnTo;
    res.redirect(redirectUrl || '/spots');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Goodbye');
    res.redirect('/');
  });
});

module.exports = router;
