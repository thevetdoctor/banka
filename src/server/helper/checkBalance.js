/* eslint-disable no-console */
import db from '../db/connect';


const checkBalance = (accountNumber) => {
  const text = 'SELECT newbalance FROM accounts WHERE accountnumber = $1';
  const values = [accountNumber];

  db.query(text, values)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows;
    })
    .catch(err => err);
};


export default checkBalance;
