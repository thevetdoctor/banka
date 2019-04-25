/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import key from './codes';


const auth = (req, res, next) => {
  console.log(req.headers.authorization);

  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    const decoded = jwt.verify(req.token, key.val);
    if (decoded) {
      next(req.token);
    }
  } else {
    res.status(401).json({
      status: 401,
      error: 'Authentication failed',
    });
  }
};


export default auth;
