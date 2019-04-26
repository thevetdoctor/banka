/* eslint-disable no-console */
import jwtdecode from 'jwt-decode';


const staffAuth = (req, res, next) => {
  const decoded = jwtdecode.jwt_decode(req.token);
  console.log(decoded);

  next();
};


export default staffAuth;
