/* eslint-disable max-len */
/* eslint-disable no-console */
const Account = require('../models/accounts');
// const userRecord = require('../controllers/users');

const userRecord = [{
  id: 1,
  email: 'dami@gmail.com',
  firstName: 'Dami',
  lastName: 'Akande',
  password: '123456',
  type: 'staff',
  isAdmin: false,
  sex: 'M',
  mobile: '1234567890',
  active: false,
}];

const accountRecord = [{
  id: 1,
  accountNumber: 2019030001,
  createdOn: new Date().toDateString(),
  owner: 1,
  type: 'savings',
  status: 'active',
  balance: 12000.25,
},
{
  id: 2,
  accountNumber: 2019030002,
  createdOn: new Date().toDateString(),
  owner: 1,
  type: 'current',
  status: 'active',
  balance: 400000.05,
},
];


const AccountController = {
  create: (req, res) => {
    const { owner, type, status } = req.body;

    const account = new Account(owner, type, status);

    account.id = accountRecord.length ? accountRecord.length + 1 : 1;
    const accountArray = accountRecord.map(item => parseInt(item.accountNumber, 10));
    let newAccountNumber = Math.max(...accountArray);
    newAccountNumber += 1;

    const accountOwner = userRecord.find(item => item.id === parseInt(account.owner, 10));
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
      // if (foundAccount.status === 'active') {
      //   foundAccount.status = accountStatus;
      // } else {
      //   foundAccount.status = 'active';
      // }
      // eslint-disable-next-line no-unused-expressions
      foundAccount.status === accountStatus ? foundAccount.status = foundAccount.status : foundAccount.status = accountStatus;
      res.status(200).json({
        status: 200,
        data: {
          accountNumber,
          status: foundAccount.status,
        },
      });
    }
  },
};


module.exports = AccountController;
