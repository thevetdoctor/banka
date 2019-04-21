/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
import pg from 'pg';
import config from '../config';
import Account from '../models/accounts';

const regExp = /[^0-9]/;
const validEmail = /(.+)@(.+){2,}\.(.+){2,}/;
const pool = new pg.Pool(config);

class AccountController {
  static create(req, res) {
    const { owner, type } = req.body;

    // console.log(owner);
    // console.log(type);

    if (regExp.test(owner)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid account owner supplied',
      });
      return;
    }

    // if (type !== 'current' || type !== 'savings') {
    //   res.status(400).json({
    //     status: 400,
    //     error: 'Curent or Savings only',
    //   });
    //   return;
    // }

    const account = new Account(owner, type);


    if (account.owner === undefined || account.owner === '') {
      res.status(400).json({
        status: 400,
        error: 'Account owner not supplied',
      });
      return;
    }


    if (account.type === undefined || account.type.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Account type not supplied',
      });
      return;
    }


    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT * FROM users', (err, result) => {
        if (err) {
          console.log(err);
        }
        // console.log(result.rows);
        const accountOwner = result.rows.find(item => item.id === parseInt(account.owner, 10));
        if (!accountOwner || accountOwner === undefined) {
          res.status(400).json({
            status: 400,
            message: 'Account owner does not exist',
          });
          return;
        }

        pool.connect((err, client, done) => {
          if (err) {
            console.log(err);
          }
          client.query('SELECT * FROM accounts', (err, result) => {
            if (err) {
              console.log(err);
            }
            // console.log(result.rows);

            const newArr = result.rows.map(val => val.id);
            const accountArray = result.rows.map(item => item.accountnumber);
            account.id = newArr.length !== 0 ? newArr.length + 1 : 1;
            if (newArr.length === 0) {
              account.accountNumber = 2019031111;
            } else {
              // console.log(newArr);
              // console.log(accountArray);
              let newAccountNumber = Math.max(...accountArray);
              newAccountNumber += 1;
              account.accountNumber = newAccountNumber;
            }
            pool.connect((err, client, done) => {
              if (err) {
                console.log(err);
              }
              // console.log(account);
              client.query('INSERT INTO accounts (id, accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6, $7)', [account.id, account.accountNumber, account.createdOn, account.owner, account.type, account.status, account.balance], (err, result) => {
                if (err) {
                  console.log(err);
                }
                console.log(result.rows, 'nothing');
                console.log(accountOwner);
                res.status(201).json({
                  status: 201,
                  data: {
                    accountNumber: account.accountNumber,
                    firstName: accountOwner.firstname,
                    lastName: accountOwner.lastname,
                    email: accountOwner.email,
                    type: account.type,
                    openingBalance: account.balance,
                  },
                });
              });
              done();
            });
            res.status(200).json({
              status: 200,
            });
            done();
          });
        });
        done();
      });
    });
  }


  static activate(req, res) {
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


  static delete(req, res) {
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


  static listAllAccounts(req, res) {
    // const accountList = [...accountRecord];
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT * FROM accounts INNER JOIN users ON accounts.owner = users.id', (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result.rows);
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
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: 'No account available',
          });
        } else {
          res.status(200).json({
            status: 200,
            data: newAccountArrray,
          });
        }
      });
      done();
    });
  }


  static listAccount(req, res) {
    const { accountNumber } = req.params;

    if (req.query.status === undefined) {
      console.log('no status');

      if (regExp.test(accountNumber)) {
        res.status(400).json({
          status: 400,
          error: 'Invalid account number',
        });
        return;
      }

      pool.connect((err, client, done) => {
        if (err) {
          console.log(err);
        }
        client.query('SELECT * FROM accounts', (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result.rows);
          const account = result.rows.find(item => item.accountnumber === Number(accountNumber));

          if (!account) {
            res.status(400).json({
              status: 400,
              error: `Account no: ${accountNumber} not available`,
            });
          } else {
            res.status(200).json({
              status: 200,
              data: {
                accountDetails: account,
              },
            });
          }
        });
        done();
      });
    } else {
      console.log('status available');
      if (req.query.status === 'active') {
        pool.connect((err, client, done) => {
          if (err) {
            console.log(err);
          }
          client.query('SELECT * FROM accounts WHERE status = $1', [req.query.status], (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result.rows);
            if (result.rows.length < 1) {
              res.status(204).json({
                status: 204,
                error: 'No ACTIVE BANK ACCOUNTS available',
              });
              return;
            }
            res.status(200).json({
              status: 200,
              data: result.rows,
            });
          });
          done();
        });
      } else if (req.query.status === 'dormant') {
        pool.connect((err, client, done) => {
          if (err) {
            console.log(err);
          }
          client.query('SELECT * FROM accounts WHERE status = $1', [req.query.status], (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result.rows);
            if (result.rows.length < 1) {
              res.status(204).json({
                status: 204,
                error: 'No DORMANT BANK ACCOUNTS available',
              });
              return;
            }
            res.status(200).json({
              status: 200,
              data: result.rows,
            });
          });
          done();
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
    const { transactions } = req.params;
    console.log(req.params);
    if (transactions !== 'transactions') {
      res.status(400).json({
        status: 400,
        error: 'Params can only be transactions',
      });
    }

    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result.rows);
        console.log(accountNumber);
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: 'Account Number does not exist',
          });
          return;
        }
        pool.connect((err, client, done) => {
          if (err) {
            console.log(err);
          }
          client.query('SELECT * FROM transactions WHERE accountnumber = $1', [accountNumber], (err, result) => {
            if (err) {
              console.log(err);
            }
            console.log(result.rows);
            res.status(200).json({
              status: 200,
              data: result.rows,
            });
          });
          done();
        });
        done();
      });
    });
  }

  static getUserBankAccounts(req, res) {
    const { userEmailAddress } = req.params;
    const { accounts } = req.params;

    console.log(req.params);
    console.log(userEmailAddress, accounts);
    if (accounts !== 'accounts') {
      res.status(400).json({
        status: 400,
        error: 'Params must be user-email-address/accounts',
      });
      return;
    }

    if (!validEmail.test(userEmailAddress)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Email',
      });
      return;
    }

    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT * FROM users INNER JOIN accounts ON users.id = accounts.owner', (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result.rows);
        const userAccounts = result.rows.filter(item => item.email === userEmailAddress);
        if (userAccounts.length < 1) {
          res.status(400).json({
            status: 400,
            error: `User with email: '${userEmailAddress}' not found`,
          });
          return;
        }
        res.status(200).json({
          status: 200,
          accounts: userAccounts,
        });
      });
      done();
    });
  }

  // static getActiveAccounts(req, res) {
  //   const { status } = req.query;

  //   console.log(req.query);

  //   pool.connect((err, client, done) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     client.query('SELECT * FROM accounts WHERE status = $1', [status], (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       }
  //       console.log(result.rows);

  //       res.status(200).json({
  //         status: 200,
  //         data: result.rows,
  //       });
  //     });
  //     done();
  //   });
  // }
}


export default AccountController;
