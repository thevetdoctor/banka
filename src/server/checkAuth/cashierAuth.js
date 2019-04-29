/* eslint-disable no-console */

const staffAuth = (req, res, next) => {
  if (req.token.type !== 'cashier') {
    res.status(403).json({
      status: 403,
      error: 'Not authorised',
    });
    return;
  }
  next();
};


export default staffAuth;
