/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable max-len */
import faker from 'faker';
import db from '../db/connect';
import Account from '../models/accounts';

class AccountController {
  static create(req, res) {
    const { type } = req.body;
    const {
      id, firstname, lastname, email,
    } = req.token;

    const newAccount = faker.finance.account();

    const account = new Account(type);

    const text = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [newAccount, account.createdOn, id, type, account.status, account.balance];

    if (type.trim() === 'current' || type.trim() === 'savings') {
      db.query(text, values)
        .then((result) => {
          console.log(result.rows[0]);
          const {
            accountnumber, type, balance,
          } = result.rows[0];
          if (!result.rows[0]) {
            res.status(400).json({
              status: 400,
              error: 'Account not created',
            });
            return;
          }
          return res.status(201).json({
            status: 201,
            data: {
              accountnumber,
              firstname,
              lastname,
              email,
              type,
              balance,
            },
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: 400,
            error: error.message,
          });
        });
    } else {
      res.status(400).json({
        status: 400,
        error: 'Only cuurent and savings allowed',
      });
    }
  }


  static activate(req, res) {
    const accountStatus = req.body.status;
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    const text = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2 RETURNING *';
    const values = [accountStatus, accountNumber];

    // eslint-disable-next-line no-constant-condition
    if (accountStatus === 'dormant' || accountStatus === 'active') {
      db.query(text, values)
        .then((result) => {
          // console.log(result.rows);
          if (result.rows.length > 0) {
            res.status(200).json({
              status: 200,
              data: {
                accountNumber,
                status: accountStatus,
              },
            });
          } else {
            res.status(400).json({
              status: 400,
              error: 'Account does not exist',
            });
          }
        })
        .catch((err) => {
          res.status(400).json({
            status: 400,
            error: `${err}, Account does not exist`,
          });
        });
    } else {
      res.status(400).json({
        status: 400,
        error: 'Status can only be dormant OR active',
      });
    }
  }


  static delete(req, res) {
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    const text = 'DELETE FROM accounts WHERE accountnumber = $1 RETURNING *';
    const values = [accountNumber];

    db.query(text, values)
      .then((result) => {
        // console.log(result.rows);
        if (result.rows.length > 0) {
          res.status(200).json({
            status: 200,
            message: `Account No: ${accountNumber} successfully deleted`,
          });
        } else {
          res.status(404).json({
            status: 404,
            error: 'Account not available',
          });
        }
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }


  static getTransactions(req, res) {
    const { accountNumber } = req.params;

    const text = 'SELECT * FROM transactions WHERE accountnumber = $1';
    const values = [accountNumber];

    db.query(text, values)
      .then((result) => {
        // if (result.rows.length > 0) {
        res.status(200).json({
          status: 200,
          data: result.rows,
        });
        // } else {
        // res.status(400).json({
        // status: 400,
        // error: 'Not available',
        // });
        // }
      })
      .catch((err) => {
        res.status(400).json({
          status: 400,
          error: `${err}, Account does not exist`,
        });
      });
  }


  static listAccount(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.query;

    const text1 = 'SELECT * FROM accounts WHERE accountnumber = $1';
    const values1 = [accountNumber];
    const text2 = 'SELECT * FROM accounts WHERE status = $1';
    const values2 = [status];

    if (status === undefined) {
      // console.log('no status');

      db.query(text1, values1)
        .then((result) => {
          // console.log(result.rows);
          if (result.rows.length < 1) {
            res.status(404).json({
              status: 404,
              error: `Account no: ${accountNumber} not available`,
            });
          } else {
            res.status(200).json({
              status: 200,
              data: {
                accountDetails: result.rows[0],
              },
            });
          }
        })
        .catch((err) => {
          res.status(403).json({
            status: 403,
            error: err,
          });
        });
    } else {
      // console.log('status available');
      // eslint-disable-next-line no-lonely-if
      if (status === 'active' || status === 'dormant') {
        db.query(text2, values2)
          .then((result) => {
            // console.log(result.rows);
            if (result.rows) {
              res.status(200).json({
                status: 200,
                data: result.rows,
              });
            }
          })
          .catch((err) => {
            res.status(402).json({
              status: 402,
              error: err,
            });
          });
      } else {
        res.status(401).json({
          status: 401,
          error: 'Query should be spelt \'active\' OR \'dormant\'',
        });
      }
    }
  }


  static getUserBankAccounts(req, res) {
    const { userEmailAddress } = req.params;
    const { accounts } = req.params;

    // console.log(req.params);
    // console.log(userEmailAddress, accounts);

    const text = 'SELECT * FROM users INNER JOIN accounts ON users.id = accounts.owner WHERE EMAIL = $1';
    const values = [userEmailAddress];

    db.query(text, values)
      .then((result) => {
        // console.log(result.rows);
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: `User with email: '${userEmailAddress}' not found`,
          });
          return;
        }
        const list = result.rows.map(item => (
          {
            createdOn: item.createdon,
            accountNumber: item.accountnumber,
            type: item.type,
            status: item.status,
            balance: item.balance,
          }));
        res.status(200).json({
          status: 200,
          accounts: list,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 400,
          error: err,
        });
      });
  }


  static listAllAccounts(req, res) {
    const text = 'SELECT * FROM accounts INNER JOIN users ON accounts.owner = users.id';
    db.query(text)
      .then((result) => {
        // console.log(result.rows);
        const newAccountArrray = result.rows.map(item => (
          {
            createdOn: item.createdon,
            accountNumber: item.accountnumber,
            ownerEmail: item.email,
            type: item.type,
            status: item.status,
            balance: item.balance,
          }
        ));
        res.status(200).json({
          status: 200,
          data: newAccountArrray,
        });
      }).catch((err) => {
        res.status(400).json({
          status: 400,
          error: err,
        });
      });
  }
}


export default AccountController;
