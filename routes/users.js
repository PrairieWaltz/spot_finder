'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username });
  const rergisteredUser = await User.register(user, password);
  console.log(rergisteredUser);
  req.flash('success', 'Welcome to SpotFinder');
  res.redirect('/spots');
});

module.exports = router;
