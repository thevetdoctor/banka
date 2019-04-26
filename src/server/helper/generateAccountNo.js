/* eslint-disable max-len */
/* eslint-disable no-console */
import db from '../db/connect';


const generateAccountNumber = () => {
  db.query('SELECT accountnumber FROM accounts ORDER BY accountnumber DESC')
    .then((result) => {
      console.log(result.rows[0]);
      const newAccountNumber = (result.rows.length) < 1 ? 2019031111 : (parseInt(result.rows[0], 10) + 1);
      console.log(newAccountNumber);
      // return newAccountNumber;
    })
    .catch((err) => {
      console.log(err);
    });
  // return accountNo;
};


export default generateAccountNumber;
