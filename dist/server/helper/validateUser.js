"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/* eslint-disable prefer-const */

/* eslint-disable no-restricted-syntax */

/* eslint-disable guard-for-in */

/* eslint-disable no-useless-escape */
// import removeWhitespace from './removeWhitespace';
var validateEmail = function validateEmail(email) {
  // copied from  https://www.freeformatter.com/regex-tester.html
  var validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test(email) && email.trim() !== '';
  return validEmail;
};

var validatePassword = function validatePassword(password) {
  var validPassword = typeof password === 'string' && password.trim() !== '' && password.trim().length >= 6;
  return validPassword;
};

var mobileRegex = /[^0-9]/;
var specialCharacters = /[.*&%£$"!@"]/;
var validateUser = {
  validateSignup: function validateSignup(req, res, next) {
    var _req$body = req.body,
        firstName = _req$body.firstName,
        lastName = _req$body.lastName,
        password = _req$body.password,
        email = _req$body.email,
        sex = _req$body.sex,
        mobile = _req$body.mobile;

    if (email === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied'
      });
      return;
    }

    if (firstName === undefined || firstName.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Firstname not supplied'
      });
      return;
    }

    if (lastName === undefined || lastName.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Lastname not supplied'
      });
      return;
    }

    if (password === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied'
      });
      return;
    }

    if (sex === undefined || sex.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Sex not supplied'
      });
      return;
    }

    if (mobile === undefined || mobile.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Mobile not supplied'
      });
      return;
    }

    if (mobileRegex.test(mobile)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Mobile Number supplied'
      });
      return;
    }

    if (mobile.trim().length !== 11) {
      res.status(400).json({
        status: 400,
        error: 'Mobile Number should be 11 digits'
      });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email'
      });
    }

    if (!validatePassword(password)) {
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters'
      });
    }

    if (specialCharacters.test(firstName)) {
      res.status(400).json({
        status: 400,
        error: 'No special chacacters allowed'
      });
    }

    if (specialCharacters.test(lastName)) {
      res.status(400).json({
        status: 400,
        error: 'No special chacacters allowed'
      });
    } // firstName = removeWhitespace(firstName);
    // req.body = {
    //   email, firstName, lastName, password, sex, mobile,
    // };


    next();
  },
  validateSignin: function validateSignin(req, res, next) {
    var _req$body2 = req.body,
        email = _req$body2.email,
        password = _req$body2.password;

    if (email === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied'
      });
      return;
    }

    if (password === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied'
      });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email'
      });
    }

    if (!validatePassword(password)) {
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters'
      });
    }

    next();
  }
};
var _default = validateUser;
exports["default"] = _default;