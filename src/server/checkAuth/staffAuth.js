/* eslint-disable no-console */
import jwt from 'jsonwebtoken';


const staffAuth = (req, res, next) => {
  const decoded = jwt.decode(req.token);
  console.log(decoded);

  next();
};


export default staffAuth;
