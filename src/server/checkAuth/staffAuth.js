import jwtDecode from 'jwt-decode';


const staffAuth = (req, res, next) => {
  const decoded = jwtDecode(req.token);
  console.log(decoded);

  next();
};


export default staffAuth;
