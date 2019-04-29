/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-useless-escape */
// import removeWhitespace from './removeWhitespace';

const validateEmail = (email) => {
  // copied from  https://www.freeformatter.com/regex-tester.html
  const validEmail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test(email) && email.trim() !== '';
  return validEmail;
};

const validatePassword = (password) => {
  const validPassword = typeof password === 'string' && password.trim() !== '' && password.trim().length >= 6;
  return validPassword;
};


const mobileRegex = /[^0-9]/;
const specialCharacters = /[.*&%£$"!@"]/;

const validateUser = {
  validateSignup: (req, res, next) => {
    let {
      firstName, lastName, password, email, sex, mobile,
    } = req.body;

    if (email === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied',
      });
      return;
    }

    if (firstName === undefined || firstName.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Firstname not supplied',
      });
      return;
    }

    if (lastName === undefined || lastName.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Lastname not supplied',
      });
      return;
    }


    if (password === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied',
      });
      return;
    }


    if (sex === undefined || sex.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Sex not supplied',
      });
      return;
    }


    if (mobile === undefined || mobile.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Mobile not supplied',
      });
      return;
    }


    if (mobileRegex.test(mobile)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Mobile Number supplied',
      });
      return;
    }

    if (mobile.trim().length !== 11) {
      res.status(400).json({
        status: 400,
        error: 'Mobile Number should be 11 digits',
      });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email',
      });
    }


    if (!validatePassword(password)) {
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters',
      });
    }

    if (specialCharacters.test(firstName)) {
      res.status(400).json({
        status: 400,
        error: 'No special chacacters allowed',
      });
    }

    if (specialCharacters.test(lastName)) {
      res.status(400).json({
        status: 400,
        error: 'No special chacacters allowed',
      });
    }

    // firstName = removeWhitespace(firstName);
    // req.body = {
    //   email, firstName, lastName, password, sex, mobile,
    // };

    next();
  },

  validateSignin: (req, res, next) => {
    const { email, password } = req.body;

    if (email === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied',
      });
      return;
    }


    if (password === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied',
      });
      return;
    }


    if (!validateEmail(email)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email',
      });
    }


    if (!validatePassword(password)) {
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters',
      });
    }


    next();
  },

};
export default validateUser;
