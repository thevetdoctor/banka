/* eslint-disable no-console */
const User = require('../models/users');

const userRecord = [];

const validUser = (user) => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email.trim() !== '';
  const validPassword = typeof user.password === 'string' && user.password.trim() !== '' && user.password.trim().length >= 6;
  return validEmail && validPassword;
};


const UserController = {

  signup: (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { firstname, lastname, password, sex, email, mobile } = req.body;

    const user = new User(firstname, lastname, password, sex, email, mobile);

    // eslint-disable-next-line max-len
    // const user = new User('Obafemi', 'Oderanti', '123456', 'M', 'thevetdoctor@gmail.com', '1234567890');

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
        userRecord.push(user);
        res.status(200).json({
          status: 200,
          data: { user, userRecord },
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
};


module.exports = UserController;
