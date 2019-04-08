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
};


module.exports = AccountController;
