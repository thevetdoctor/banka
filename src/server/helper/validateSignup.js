const validateEmail = (email) => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

const validatePassword = (password) => {
  const validPassword = typeof password === 'string' && password.trim() !== '' && password.trim().length >= 6;
  return validPassword;
};


const mobileRegex = /[^0-9]/;


const validateSignup = (req, res, next) => {
  let {
    firstName, lastName, sex, mobile,
  } = req.body;
  const { email, password } = req.body;

  firstName = firstName.trim();
  lastName = lastName.trim();
  sex = sex.trim();
  mobile = mobile.trim();


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
};

export default validateSignup;


// if (user.sex !== 'M' || user.sex !== 'F') {
//   res.status(400).json({
//     status: 400,
//     error: 'Invalid Sex supplied',
//   });
//   return;
// }
