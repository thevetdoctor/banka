/* eslint-disable no-console */
/* eslint-disable max-len */
import db from '../db/connect';
import Account from '../models/accounts';
import generateAccountNumber from '../helper/generateAccountNo';


class AccountController {
  static create(req, res) {
    const { owner, type } = req.body;

    const account = new Account(owner, type);


    const newAccount = generateAccountNumber();
    console.log(newAccount, 16);


    const text = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [newAccount, account.createdOn, owner, type, account.status, account.balance];

    console.log(values);

    db.query(text, values)
      .then((result) => {
        console.log(result.rows[0]);

        const {
          accountnumber, firstname, lastname, email, type2, openingBalance,
        } = result.rows[0];

        if (!result.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: 'Account not created',
          });
        }

        return res.status(201).json({
          status: 201,
          data: {
            accountnumber,
            firstname,
            lastname,
            email,
            type: type2,
            openingBalance,
          },
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: 400,
          error: error.message,
        });
      });
  }


  static activate(req, res) {
    const accountStatus = req.body.status;
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    const text = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2';
    const values = [accountStatus, accountNumber];

    // eslint-disable-next-line no-constant-condition
    if (accountStatus === 'dormant' || accountStatus === 'active') {
      db.query(text, values)
        .then((result) => {
          console.log(result.rows);
          res.status(200).json({
            status: 200,
            data: {
              accountNumber,
              status: accountStatus,
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
      res.status(400).json({
        status: 400,
        error: 'Status can only be dormant OR active',
      });
    }
  }


  static delete(req, res) {
    let { accountNumber } = req.params;
    accountNumber = parseInt(accountNumber, 10);

    const text = 'DELETE * FROM accounts WHERE accountnumber = $1';
    const values = [accountNumber];

    db.query(text, values)
      .then((result) => {
        console.log(result.rows);
        res.status(200).json({
          status: 200,
          message: `Account No: ${accountNumber} successfully deleted`,
        });
      })
      .catch((err) => {
        res.status(404).json({
          status: 404,
          error: `${err} or Account not available`,
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


  static listAccount(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.query;

    const text1 = 'SELECT * FROM accounts WHERE accountnumber = $1';
    const values1 = [accountNumber];
    const text2 = 'SELECT * FROM accounts WHERE status = $1';
    const values2 = [status];

    if (status === undefined) {
      console.log('no status');

      db.query(text1, values1)
        .then((result) => {
          // console.log(result.rows);
          if (result.rows.length < 1) {
            res.status(400).json({
              status: 400,
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
          res.status(400).json({
            status: 400,
            error: err,
          });
        });
    } else {
      console.log('status available');
      if (status === 'active' || status === 'dormant') {
        db.query(text2, values2)
          .then((result) => {
            // console.log(result.rows);
            res.status(200).json({
              status: 200,
              data: result.rows,
            });
          })
          .catch((err) => {
            res.status(400).json({
              status: 400,
              error: err,
            });
          });
      } else {
        res.status(400).json({
          status: 400,
          error: 'Query should be spelt \'active\' OR \'dormant\'',
        });
      }
    }
  }


  static getTransactions(req, res) {
    const { accountNumber } = req.params;
    console.log(req.params);

    const text = 'SELECT * FROM transactions WHERE accountnumber = $1';
    const values = [accountNumber];

    db.query(text, values)
      .then((result) => {
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: 'Account Number does not exist',
          });
          return;
        }
        res.status(200).json({
          status: 200,
          data: result.rows,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 400,
          error: err,
        });
      });
  }


  static getUserBankAccounts(req, res) {
    const { userEmailAddress } = req.params;
    const { accounts } = req.params;

    console.log(req.params);
    console.log(userEmailAddress, accounts);

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
}


export default AccountController;
