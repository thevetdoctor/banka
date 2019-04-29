/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import db from '../db/connect';
import Transaction from '../models/transactions';
import checkBalance from '../helper/checkBalance';

const regExp = /[^0-9]/;

class TransactionController {
  static creditAndDebit(req, res) {
    const { amount } = req.body;
    const { accountNumber } = req.params;
    const { type } = req.params;

    const currentBalance = checkBalance(accountNumber);
    console.log(currentBalance);

    console.log('getting in');

    if (!currentBalance) {
      res.status(400).json({
        status: 400,
        error: 'Account does not exist',
      });
      return;
    }

    const tranx = new Transaction(type, accountNumber, amount);
    const cashierID = 10002;


    // Run this block for 'valid' transaction type
<<<<<<< f317fd1627545f910f29f6eaacc8fa1e5dafff25
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
      // Search Account Records for specific bank account
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err);
        }
        client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], (err, result) => {
          if (err) {
            console.log(err);
          }
          // console.log(result.rows);
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
          if (result.rows.length < 1) {
            res.status(400).json({
              status: 400,
              error: 'Account does not exist',
            });
            return;
          }
          const foundAccount = result.rows.find(item => item.accountnumber === parseInt(tranx.accountNumber, 10));
          // console.log(foundAccount);
          if (!foundAccount && foundAccount === undefined) {
            res.status(401).json({
              status: 401,
=======
          // if (result.rows.length < 1) {
          //   res.status(400).json({
          //     status: 400,
          //     error: 'Account does not exist',
          //   });
          //   return;
          // }
          const foundAccount = result.rows.find(item => item.accountnumber === parseInt(tranx.accountNumber, 10));
          // console.log(foundAccount);
          if (!foundAccount && foundAccount === undefined) {
            res.status(400).json({
              status: 400,
>>>>>>> immersive
              error: 'Account not available',
=======
=======
    // And this block for debit transaction
>>>>>>> addup-to-feedback-branch
    if (tranx.type === 'credit') {
      const newBalance = parseFloat(currentBalance + amount);
      const text1 = 'INSERT INTO transactions (createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const values1 = [tranx.createdOn, type, accountNumber, cashierID, amount, currentBalance, newBalance];
      const text2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
      const values2 = [accountNumber, newBalance];

      console.log('getting in');

      db.query(text1, values1)
        .then((result) => {
          console.log(result.rows);
        })
        .catch((err) => {
          res.status(400).json({
            status: 400,
            error: err,
          });
        });

      db.query(text2, values2)
        .then((result) => {
          // console.log(result.rows);
          res.status(200).json({
            status: 200,
            data: {
              transactionId: tranx.id,
              accountNumber: tranx.accountNumber,
              amount: tranx.amount,
              cashier: cashierID,
              transactionType: tranx.type,
              accountBalance: tranx.newBalance,
            },
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: 400,
            error: err,
          });
        });
    } else {
      // And this block for debit transaction
      console.log('getting in');
      const newBalance = parseFloat(currentBalance - amount);
      const text1 = 'INSERT INTO transactions (createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const values1 = [tranx.createdOn, type, accountNumber, cashierID, amount, currentBalance, newBalance];
      const text2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
      const values2 = [accountNumber, newBalance];

      console.log('getting out');
      if (newBalance < 0) {
        res.status(400).json({
          status: 400,
          error: 'Insufficient balance in account',
        });
      } else {
        db.query(text1, values1)
          .then((result) => {
            // console.log(result.rows);
          })
          .catch((err) => {
            res.status(400).json({
              status: 400,
              error: err,
>>>>>>> feature(refactoring):refactor the controllers
            });
          });

        db.query(text2, values2)
          .then((result) => {
            // console.log(result.rows);
            res.status(200).json({
              status: 200,
              data: {
                transactionId: tranx.id,
                accountNumber: tranx.accountNumber,
                amount: tranx.amount,
                cashier: cashierID,
                transactionType: tranx.type,
                accountBalance: tranx.newBalance,
              },
            });
          })
          .catch((err) => {
            res.status(400).json({
              status: 400,
              error: err,
            });
          });
      }
    } // End of debit transaction block
  }


  static getTransaction(req, res) {
    const { transactionId } = req.params;

    const text = 'SELECT * FROM transactions WHERE id = $1';
    const values = [transactionId];

    db.query(text, values)
      .then((result) => {
        // console.log(result.rows);
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: 'Transaction not available',
          });
          return;
        }
        res.status(200).json({
          status: 200,
          data: result.rows[0],
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 400,
          error: err,
        });
      });
  }
}


export default TransactionController;
