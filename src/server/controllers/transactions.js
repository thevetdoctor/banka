/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import db from '../db/connect';
import Transaction from '../models/transactions';
import cashierRecord from '../records/cashierRecord';
import checkBalance from '../helper/checkBalance';

const regExp = /[^0-9]/;

class TransactionController {
  static creditAndDebit(req, res) {
    const { amount } = req.body;
    const { accountNumber } = req.params;
    const { type } = req.params;

    const currentBalance = checkBalance(accountNumber);

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
    if (tranx.type === 'credit') {
      const newBalance = parseFloat(currentBalance + amount);
      const text1 = 'INSERT INTO transactions (createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const values1 = [tranx.createdOn, type, accountNumber, cashierID, amount, currentBalance, newBalance];
      const text2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
      const values2 = [accountNumber, newBalance];

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
          console.log(result.rows);
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
      const newBalance = parseFloat(currentBalance - amount);
      const text1 = 'INSERT INTO transactions (createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
      const values1 = [tranx.createdOn, type, accountNumber, cashierID, amount, currentBalance, newBalance];
      const text2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
      const values2 = [accountNumber, newBalance];

      if (newBalance < 0) {
        res.status(400).json({
          status: 400,
          error: 'Insufficient balance in account',
        });
      } else {
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
            console.log(result.rows);
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
        console.log(result.rows);
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
