/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import key from './codes';

const auth = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;

    jwt.verify(req.token, key.val, (err, decoded) => {
      if (err) {
        res.status(403).json({
          status: 403,
          error: `${err}, Authentication failed`,
        });
        return;
      }
      req.token = decoded.newUser;
      next();
    });
  } else {
    res.status(403).json({
      status: 403,
      error: 'Authentication failed',
    });
  }
};

export default auth;
