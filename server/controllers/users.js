/* eslint-disable no-console */
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const userRecord = [{
  id: 1,
  email: 'dami@gmail.com',
  firstName: 'Dami',
  lastName: 'Akande',
  password: '123456',
  type: 'staff',
  isAdmin: false,
  sex: 'M',
  mobile: '1234567890',
  active: false,
}];

const validUser = (user) => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email.trim() !== '';
  const validPassword = typeof user.password === 'string' && user.password.trim() !== '' && user.password.trim().length >= 6;
  return validEmail && validPassword;
};


const UserController = {

  signup: (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { email, firstName, lastName, password, sex, mobile } = req.body;

    const user = new User(email, firstName, lastName, password, sex, mobile);

    // check validity of user name & password
    if (validUser(user)) {
      // Assign user ID
      user.id = userRecord.length ? userRecord.length + 1 : 1;
      const userEmails = userRecord.map(value => value.email);

      //   Validate if email is already registered
      if (userEmails.includes(user.email)) {
        res.status(400).json({
          status: 400,
          error: 'Email already used',
        });
      } else {
        // save user in User table in User Record
        const token = jwt.sign({ user }, 'secretKey', { expiresIn: '1min' });
        userRecord.push(user);
        res.status(200).json({
          status: 200,
          data: {
            token,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        });
      }
    } else {
    // send an error
      res.status(401).json({
        status: 401,
        error: 'Invalid Email/Password must be minimum of 6 characters',
      });
    }
  },


  signin: (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };

    if (user.email !== '' && user.password !== '') {
      // Query User Record for credentials
      const newUser = userRecord.find(item => item.email === user.email);
      // console.log(newUser);
      if (newUser.email) {
        if (newUser.password === user.password) {
          // newUser.password = null;
          const token = jwt.sign({ newUser }, 'secretKey', { expiresIn: '1min' });
          res.status(200).json({
            status: 200,
            data: {
              token,
              id: newUser.id,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: user.email,
            },
          });
        } else {
          res.status(400).json({
            status: 400,
            error: 'Invalid password',
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          error: 'Invalid email',
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: 'Please enter your email & password',
      });
    }
  },

};


module.exports = { UserController, userRecord };
