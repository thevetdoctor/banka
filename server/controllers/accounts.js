const Account = require('../models/accounts');
const { userRecord } = require('../controllers/users');

const accountRecord = [
  {
    id: 1,
    accountNumber: 2019031111,
    createdOn: new Date().toDateString(),
    owner: 1,
    type: 'savings',
    status: 'active',
    balance: '12000.25',
  },
  {
    id: 2,
    accountNumber: 2019031112,
    createdOn: new Date().toDateString(),
    owner: 1,
    type: 'current',
    status: 'active',
    balance: '4000.05',
  },
  {
    id: 3,
    accountNumber: 2019031113,
    createdOn: new Date().toDateString(),
    owner: 1,
    type: 'current',
    status: 'active',
    balance: '40100.05',
  },
];


const AccountController = {
  create: (req, res) => {
    const { owner, type, status } = req.body;

    // if (!req.body) {
    //   res.status(400).json({
    //     status: 400,
    //     message: 'Please supply required details',
    //   });
    // }

    const account = new Account(owner, type, status);

    account.id = accountRecord.length ? accountRecord.length + 1 : 1;
    const accountArray = accountRecord.map(item => parseInt(item.accountNumber, 10));
    let newAccountNumber = Math.max(...accountArray);
    newAccountNumber += 1;
    account.accountNumber = newAccountNumber;

    const accountOwner = userRecord.find(item => item.id === parseInt(account.owner, 10));
    if (!accountOwner) {
      res.status(400).json({
        status: 400,
        message: 'Account owner not available',
      });
    }
    accountRecord.push(account);
    res.status(200).json({
      status: 200,
      data: {
        accountNumber: newAccountNumber,
        firstName: accountOwner.firstName,
        lastName: accountOwner.lastName,
        email: accountOwner.email,
        type: account.type,
        openingBalance: account.balance,
      },
    });
  },


  activate: (req, res) => {
    const accountStatus = req.body.status;
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    // eslint-disable-next-line max-len
    const foundAccount = accountRecord.find(item => item.accountNumber === accountNumber);

    if (foundAccount === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Account not available',
      });
    } else {
      // eslint-disable-next-line max-len
      foundAccount.status = foundAccount.status === accountStatus ? foundAccount.status : accountStatus;
      res.status(200).json({
        status: 200,
        data: {
          accountNumber,
          status: foundAccount.status,
        },
      });
    }
  },


  delete: (req, res) => {
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    const foundAccount = accountRecord.find(item => item.accountNumber === accountNumber);
    if (foundAccount === undefined) {
      res.status(400).json({
        status: 400,
        error: 'Account not available',
      });
    } else {
      accountRecord.splice(foundAccount, 1);

      res.status(200).json({
        status: 200,
        message: `Account No: ${foundAccount.accountNumber} successfully deleted`,
      });
    }
  },
};


module.exports = { AccountController, accountRecord };
