/* eslint-disable no-lonely-if */
/* eslint-disable no-console */
/* eslint-disable max-len */
const Transaction = require('../models/transactions');
const { accountRecord } = require('../controllers/accounts');


const transactionRecord = [
  // {
  //   id: 1,
  //   createdOn: new Date().toDateString(),
  //   type: 'credit',
  //   accountNumber: 2019030001,
  //   cashier: 2,
  //   amount: 2000.00,
  //   oldBalance: 15000.05,
  //   newBalance: 17000.05,
  // },
  // {
  //   id: 2,
  //   createdOn: new Date().toDateString(),
  //   type: 'credit',
  //   accountNumber: 2019030001,
  //   cashier: 2,
  //   amount: 2000.00,
  //   oldBalance: 17000.05,
  //   newBalance: 19000.05,
  // },
  // {
  //   id: 3,
  //   createdOn: new Date().toDateString(),
  //   type: 'credit',
  //   accountNumber: 2019030001,
  //   cashier: 1,
  //   amount: 2500.00,
  //   oldBalance: 19000.05,
  //   newBalance: 21500.05,
  // },
];


const cashierRecord = [
  {
    id: 1,
    firstName: 'AnalyserNode',
    lastName: 'TreeWalker',
  },
  {
    id: 2,
    firstName: 'Analyser',
    lastName: 'Tree',
  },
  {
    id: 3,
    firstName: 'Node',
    lastName: 'Walker',
  },
];


const TransactionController = {

  creDebit: (req, res) => {
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
      const foundAccount = accountRecord.find(item => item.accountNumber === parseInt(tranx.accountNumber, 10));
      // console.log(foundAccount);
      // console.log(tranx.type);
      if (!foundAccount && foundAccount === undefined) {
        res.status(401).json({
          status: 401,
          error: 'Account not available',
        });
      } else {
        // Assign a transaction ID
        tranx.id = transactionRecord.length ? transactionRecord.length + 1 : 1;

        // Then, acquire a unique cashier identity
        tranx.cashier = Math.ceil(Math.random() * 3);
        const foundCashier = cashierRecord.find(item => item.id === tranx.cashier);

        // Run this block for credit transaction
        if (tranx.type === 'credit') {
          tranx.oldBalance = Number(foundAccount.balance);
          tranx.newBalance = tranx.oldBalance + Number(tranx.amount);
          tranx.newBalance = tranx.newBalance.toFixed(2);

          foundAccount.balance = tranx.newBalance;
          transactionRecord.push(tranx);

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
        } else {
          // And this block for debit transaction
          tranx.oldBalance = Number(foundAccount.balance);
          if (tranx.oldBalance < Number(tranx.amount)) {
            res.status(400).json({
              status: 400,
              error: 'Insufficient balance in account',
            });
          } else {
            tranx.newBalance = tranx.oldBalance - Number(tranx.amount);
            tranx.newBalance = tranx.newBalance.toFixed(2);

            foundAccount.balance = tranx.newBalance;
            transactionRecord.push(tranx);

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
          }
        } // End of debit transaction block
      }
    }
  },

};


module.exports = { TransactionController, transactionRecord };
