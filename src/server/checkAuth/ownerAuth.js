/* eslint-disable no-console */
import db from '../db/connect';

const ownerAuth = (req, res, next) => {
  const text = 'SELECT * FROM accounts WHERE owner = $1 AND accountnumber = $2';
  const values = [req.token.id, req.params.accountNumber];
  console.log(req.token.id);
  db.query(text, values)
    .then((result) => {
      console.log(result.rows);
      if (result.rows.length > 0 || req.token.type === 'staff' || req.token.type === 'admin') {
        next();
      } else {
        res.status(403).json({
          status: 403,
          error: 'Not authorised',
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


export default ownerAuth;
