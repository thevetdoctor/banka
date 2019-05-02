/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import User from '../models/users';

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
  active: false
}];

const validUser = user => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email.trim() !== '';
  const validPassword = typeof user.password === 'string' && user.password.trim() !== '' && user.password.trim().length >= 6;
  return validEmail && validPassword;
};

const validateEmail = email => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

const mobileRegex = /[^0-9]/;

class UserController {
  constructor() {}

  signup(req, res) {
    // eslint-disable-next-line object-curly-newline
    const { email, firstName, lastName, password, sex, mobile } = req.body;

    const user = new User(email, firstName, lastName, password, sex, mobile);
    // console.log(user.email);
    // const checkUser = Object.keys(user);
    // for (const item in user) {
    // console.log(item);
    // }
    if (user.firstName === undefined || user.firstName.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Firstname not supplied'
      });
      return;
    }

    if (user.lastName === undefined || user.lastName.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Lastname not supplied'
      });
      return;
    }

    if (user.email === undefined || user.email === '') {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied'
      });
      return;
    }

    if (user.password === undefined || user.password === '') {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied'
      });
      return;
    }

    if (user.sex === undefined || user.sex === '') {
      res.status(400).json({
        status: 400,
        error: 'Sex not supplied'
      });
      return;
    }

    // if (user.sex !== 'M' || user.sex !== 'F') {
    //   res.status(400).json({
    //     status: 400,
    //     error: 'Invalid Sex supplied',
    //   });
    //   return;
    // }

    if (user.mobile === undefined || user.mobile === '') {
      res.status(400).json({
        status: 400,
        error: 'Mobile not supplied'
      });
      return;
    }

    if (mobileRegex.test(user.mobile)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Mobile Number supplied'
      });
      return;
    }

    // Validate Email
    if (!validateEmail(user.email)) {
      console.log(user.email);
      res.status(400).json({
        status: 400,
        error: 'Invalid Email'
      });
      return;
    }

    // check validity of user name & password
    if (validUser(user)) {
      const userEmails = userRecord.map(value => value.email);
      //   Validate if email is already registered
      if (userEmails.includes(user.email)) {
        res.status(400).json({
          status: 400,
          error: 'Email already used'
        });
      } else {
        // Assign user ID
        user.id = userRecord.length ? userRecord.length + 1 : 1;
        // save user in User Record
        const token = jwt.sign({ user }, 'secretKey', { expiresIn: '1min' });
        userRecord.push(user);
        res.status(201).json({
          status: 201,
          data: {
            token,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
        });
      }
    } else {
      // send an error
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters'
      });
    }
  }

  signin(req, res) {
    const { email, password } = req.body;
    const user = { email, password };

    if (user.email === undefined || user.email === '') {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied'
      });
      return;
    }

    if (user.password === undefined || user.password === '') {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied'
      });
      return;
    }

    // Query User Record for credentials
    const newUser = userRecord.find(item => item.email === user.email);
    // console.log(newUser);
    if (newUser) {
      if (newUser.password === user.password) {
        // delete newUser.password;
        const token = jwt.sign({ newUser }, 'secretKey', { expiresIn: '1min' });
        res.status(200).json({
          status: 200,
          data: {
            token,
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
          },
          newUser
        });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Invalid password'
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        error: 'Invalid email'
      });
    }
  }

}

export { UserController, userRecord };