"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateEmail = function validateEmail(email) {
  var validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

var validatePassword = function validatePassword(password) {
  var validPassword = typeof password === 'string' && password.trim() !== '' && password.trim().length >= 6;
  return validPassword;
};

var validateSignin = function validateSignin(req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;

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
};

var _default = validateSignin; // if (user.sex !== 'M' || user.sex !== 'F') {
//   res.status(400).json({
//     status: 400,
//     error: 'Invalid Sex supplied',
//   });
//   return;
// }

exports["default"] = _default;