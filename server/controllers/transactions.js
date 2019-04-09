const Transaction = require('../models/transactions');
const { accountRecord } = require('../controllers/accounts');


const transactionRecord = [
  {
    id: 1,
    createdOn: new Date().toDateString(),
    type: 'credit',
    accountNumber: 2019030001,
    cashier: 2,
    amount: 2000.00,
    oldBalance: 15000.05,
    newBalance: 17000.05,
  },
  {
    id: 2,
    createdOn: new Date().toDateString(),
    type: 'credit',
    accountNumber: 2019030001,
    cashier: 2,
    amount: 2000.00,
    oldBalance: 17000.05,
    newBalance: 19000.05,
  },
  {
    id: 3,
    createdOn: new Date().toDateString(),
    type: 'credit',
    accountNumber: 2019030001,
    cashier: 1,
    amount: 2500.00,
    oldBalance: 19000.05,
    newBalance: 21500.05,
  },
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

  credit: (req, res) => {
    const { amount } = req.body;
    const { accountNumber } = req.params;
    const type = req.params.credit;

    const tranx = new Transaction(type, accountNumber, amount);

    if (tranx.type !== 'credit') {
      res.status(400).json({
        status: 400,
        message: 'Invalid Transaction type',
      });
    } else {
      tranx.id = transactionRecord.length ? transactionRecord.length + 1 : 1;

      tranx.cashier = Math.ceil(Math.random() * 3);
      const foundCashier = cashierRecord.find(item => item.id === tranx.cashier);
      // eslint-disable-next-line max-len
      const foundAccount = accountRecord.find(item => item.accountNumber === parseFloat(tranx.accountNumber));
      if (!foundAccount && foundAccount === undefined) {
        res.status(401).json({
          status: 401,
          message: 'Account not available',
        });
      }
      // else {
      tranx.oldBalance = foundAccount.balance;
      tranx.newBalance = tranx.oldBalance + parseFloat(tranx.amount);
      const newBalance = parseFloat(tranx.newBalance).toFixed(2);

      foundAccount.balance = tranx.newBalance;

      res.status(200).json({
        status: 200,
        data: {
          transactionId: tranx.id,
          accountNumber: tranx.accountNumber,
          amount: tranx.amount,
          cashier: foundCashier.id,
          transactionType: tranx.type,
          accountBalance: newBalance,
        },
      });
      // }
    }
  },

};


module.exports = { TransactionController, transactionRecord };
