/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
import pg from 'pg';
import config from '../config';
import Transaction from '../models/transactions';
import cashierRecord from '../db/cashierRecord';

const regExp = /[^0-9]/;
const pool = new pg.Pool(config);

class TransactionController {
  static creDebit(req, res) {
    const { amount } = req.body;
    const { accountNumber } = req.params;
    const { type } = req.params;

    const tranx = new Transaction(type, accountNumber, amount);

    // Validate amount to credit
    if (amount === undefined || amount === '') {
      res.status(400).json({
        status: 400,
        error: 'Amount not supplied',
      });
      return;
    }

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(amount)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Amount',
      });
      return;
    }

    // Run this block if type of transaction is neither credit nor debit
    if (tranx.type !== 'credit' && tranx.type !== 'debit') {
      res.status(400).json({
        status: 400,
        error: 'Invalid Transaction type',
      });
    } else {
    // Run this block for 'valid' transaction type
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
              error: 'Account not available',
            });
          } else {
            // Assign a transaction ID
            pool.connect((err, client, done) => {
              if (err) {
                console.log(err);
              }
              client.query('SELECT * FROM transactions', (err, result) => {
                if (err) {
                  console.log(err);
                }
                // console.log(result.rows);
                tranx.id = (result.rows.length !== 0) ? result.rows.length + 1 : 1;

                // Then, acquire a unique cashier identity

                tranx.cashier = Math.ceil(Math.random() * 3);
                const foundCashier = cashierRecord.find(item => item.id === tranx.cashier);

                // Run this block for credit transaction
                if (tranx.type === 'credit') {
                  tranx.oldBalance = Number(foundAccount.balance);
                  tranx.newBalance = tranx.oldBalance + Number(tranx.amount);
                  tranx.newBalance = tranx.newBalance.toFixed(2);

                  // console.log(foundAccount.balance);
                  // console.log(tranx.oldBalance);
                  // console.log(tranx.amount);
                  // console.log(tranx.newBalance);

                  pool.connect((err, client, done) => {
                    if (err) {
                      console.log(err);
                    }
                    client.query('INSERT INTO transactions (id, createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [tranx.id, tranx.createdOn, tranx.type, tranx.accountNumber, foundCashier.id, tranx.amount, tranx.oldBalance, tranx.newBalance], (err, result) => {
                      if (err) {
                        console.log(err);
                      }
                      // console.log(result.rows);

                      pool.connect((err, client, done) => {
                        if (err) {
                          console.log(err);
                        }
                        client.query('UPDATE accounts SET balance = $1 WHERE accountnumber = $2', [tranx.newBalance, tranx.accountNumber], (err, result) => {
                          if (err) {
                            console.log(err);
                          }
                          // console.log(result.rows);
                        });
                        done();
                      });

                      res.status(200).json({
                        status: 200,
                        data: {
                          transactionId: tranx.id,
                          accountNumber: tranx.accountNumber,
                          amount: tranx.amount,
                          cashier: foundCashier.id,
                          transactionType: tranx.type,
                          accountBalance: tranx.newBalance,
                        },
                      });
                    });
                    done();
                  });
                } else {
                  // And this block for debit transaction
                  tranx.oldBalance = Number(foundAccount.balance);
                  if (tranx.oldBalance < Number(tranx.amount)) {
                    res.status(400).json({
                      status: 400,
                      error: 'Insufficient balance in account',
                    });
                  } else {
                    // console.log(tranx.oldBalance);
                    tranx.newBalance = tranx.oldBalance - Number(tranx.amount);
                    tranx.newBalance = tranx.newBalance.toFixed(2);

                    // console.log(foundAccount);
                    foundAccount.balance = tranx.newBalance;
                    pool.connect((err, client, done) => {
                      if (err) {
                        console.log(err);
                      }
                      client.query('INSERT INTO transactions (id, createddate, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [tranx.id, tranx.createdOn, tranx.type, tranx.accountNumber, foundCashier.id, tranx.amount, tranx.oldBalance, tranx.newBalance], (err, result) => {
                        if (err) {
                          console.log(err);
                        }
                        // console.log(result.rows);

                        pool.connect((err, client, done) => {
                          if (err) {
                            console.log(err);
                          }
                          client.query('UPDATE accounts SET balance = $1 WHERE accountnumber = $2', [tranx.newBalance, tranx.accountNumber], (err, result) => {
                            if (err) {
                              console.log(err);
                            }
                            // console.log(result.rows);
                          });
                          done();
                        });

                        res.status(200).json({
                          status: 200,
                          data: {
                            transactionId: tranx.id,
                            accountNumber: tranx.accountNumber,
                            amount: tranx.amount,
                            cashier: foundCashier.id,
                            transactionType: tranx.type,
                            accountBalance: tranx.newBalance,
                          },
                        });
                      });
                      done();
                    });
                  }
                } // End of debit transaction block
              });
              done();
            });
          }
        });
        done();
      });
    }
  }


  // static getAccountHistory(req, res) {
  //   const { accountNumber } = req.body;

  //   pool.connect((err, client, done) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     client.query('SELECT * FROM transactions WHERE accountnumber = $1', [accountNumber], (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log(result.rows);
  //       res.status(200).json({
  //         status: 200,
  //         data: [],
  //       });
  //     });
  //     done();
  //   });
  // }


  static getTransaction(req, res) {
    const { transactionId } = req.params;

    if (regExp.test(transactionId)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid transaction ID',
      });
      return;
    }

    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT * FROM transactions WHERE id = $1', [transactionId], (err, result) => {
        if (err) {
          console.log(err);
        }
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
      });
      done();
    });
  }
}


export default TransactionController;
