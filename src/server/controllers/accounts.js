/* eslint-disable no-console */
import Account from '../models/accounts';
import { userRecord } from './users';

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


class AccountController  {
  // constructor() {
//
  // }

  create(req, res) {
    const { owner, type } = req.body;

    const account = new Account(owner, type);
    console.log(account.owner);
    console.log(account.type);

    if (account.owner === undefined || account.owner === '') {
      res.status(400).json({
        status: 400,
        error: 'Account owner not supplied',
      });
      return;
    }

    if (account.type === undefined || account.type === '') {
      res.status(400).json({
        status: 400,
        error: 'Account type not supplied',
      });
      return;
    }

    // if (account.type !== 'current' || account.type !== 'savings') {
    //   res.status(400).json({
    //     status: 400,
    //     message: 'Account type must be savings or current',
    //   });
    //   return;
    // }


    const accountOwner = userRecord.find(item => item.id === parseInt(account.owner, 10));
    if (!accountOwner || accountOwner === undefined) {
      res.status(400).json({
        status: 400,
        message: 'Account owner does not exist',
      });
    }

    account.id = accountRecord.length ? accountRecord.length + 1 : 1;
    const accountArray = accountRecord.map(item => parseInt(item.accountNumber, 10));
    let newAccountNumber = Math.max(...accountArray);
    newAccountNumber += 1;
    account.accountNumber = newAccountNumber;


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
  }


  activate(req, res) {
    const accountStatus = req.body.status;
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    console.log(accountStatus);
    if (accountStatus === undefined || accountStatus === '') {
      res.status(400).json({
        status: 400,
        error: 'Status not supplied',
      });
      return;
    }

    // if (accountStatus !== 'dormant' || accountStatus !== 'active') {
    //   res.status(400).json({
    //     status: 400,
    //     message: 'Status can only be dormant or active',
    //   });
    //   return;
    // }

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
  }


  delete(req, res) {
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    const foundAccount = accountRecord.find(item => item.accountNumber === accountNumber);
    if (foundAccount === undefined) {
      res.status(404).json({
        status: 404,
        error: 'Account not available',
      });
    } else {
      accountRecord.splice(foundAccount, 1);

      res.status(200).json({
        status: 200,
        message: `Account No: ${foundAccount.accountNumber} successfully deleted`,
      });
    }
  }


  list(req, res) {
    const accountList = [...accountRecord];
    if (accountList.length < 1) {
      res.status(400).json({
        status: 400,
        message: 'No account available',
      });
    } else {
      res.status(200).json({
        status: 200,
        data: {
          accounts: accountList,
        },
      });
    }
  }


  listOne(req, res) {
    const { accountNumber } = req.params;
    const accountList = [...accountRecord];
    const account = accountList.find(item => item.accountNumber === Number(accountNumber));

    if (!account) {
      res.status(400).json({
        status: 400,
        message: `Account no: ${accountNumber} not available`,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: {
          accountDetails: account,
        },
      });
    }
  }
}


export  { AccountController, accountRecord };
