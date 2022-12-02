'use strict';

const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

// REGISTER form and send
router
  .route('/register')
  .get(users.renderRegisterForm)
  .post(catchAsync(users.registerUser));

// LOGIN form and send
router
  .route('/login')
  .get(users.renderLoginForm)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
      keepSessionInfo: true,
    }),
    users.userLogin
  );

router.get('/logout', users.logoutRoute);

module.exports = router;
