const validateEmail = (email) => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

const validatePassword = (password) => {
  const validPassword = typeof password === 'string' && password.trim() !== '' && password.trim().length >= 6;
  return validPassword;
};


const validateSignin = (req, res, next) => {
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
};

export default validateSignin;


// if (user.sex !== 'M' || user.sex !== 'F') {
//   res.status(400).json({
//     status: 400,
//     error: 'Invalid Sex supplied',
//   });
//   return;
// }
