/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import db from '../db/connect';
import Transaction from '../models/transactions';


class TransactionController {
  static creditAndDebit(req, res) {
    const { amount } = req.body;
    let { accountNumber } = req.params;
    const { type } = req.params;

    console.log(req.token.id);
    console.log(accountNumber);
    accountNumber = parseInt(accountNumber, 10);
    console.log(accountNumber);

    let currentBalance;
    const text = 'SELECT balance FROM accounts WHERE accountnumber = $1';
    const values = [accountNumber];

    db.query(text, values)
      .then((result) => {
        // console.log(result.rows[0], result.rows, 'mm');
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: 'Account does not exist',
          });
          return;
        }
        const { balance } = result.rows[0];
        currentBalance = balance;
        console.log(currentBalance, 'in');
        //   })
        //   .catch(err => err);
        // console.log(currentBalance, 'out');

        console.log('getting in');

        const tranx = new Transaction(type, accountNumber, amount);
        const cashierID = req.token.id;


        // Run this block for 'valid' transaction type
        // And this block for credit transaction
        if (tranx.type === 'credit') {
          const newBalance = parseFloat((currentBalance + amount), 10).toFixed(2);
          console.log(currentBalance);
          console.log(amount);
          console.log(newBalance);
          const text1 = 'INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
          const values1 = [tranx.createdOn, type, accountNumber, cashierID, amount, currentBalance, newBalance];
          const text2 = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2';
          const values2 = [accountNumber, newBalance];

          console.log('getting in');
          console.log(values1);

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
            .then(() => {
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
          const newBalance = parseFloat((currentBalance - amount), 10).toFixed(2);
          console.log(currentBalance);
          console.log(amount);
          console.log(newBalance);
          const text1 = 'INSERT INTO transactions (createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7)';
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
      })
      .catch(err => err);
    console.log(currentBalance, 'out');
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
