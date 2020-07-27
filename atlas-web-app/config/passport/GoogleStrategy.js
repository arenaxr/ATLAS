'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//var verifyHandler = function(req, token, tokenSecret, profile, done) {
let verifyHandler = function (accessToken, refreshToken, profile, cb, done) {
  let data = {
    id: cb.id,
    name: cb.displayName,
    email: cb.emails[0].value,
    emailVerified: cb.emails[0].verified
  };

  return done(null, data);
};

passport.use(new GoogleStrategy({
  clientID: '173603117246-7lehsb3tpq4i17e7sla5bue1an4ps9t6.apps.googleusercontent.com',
  clientSecret: process.env.ARENA_OAUTH_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
}, verifyHandler));
