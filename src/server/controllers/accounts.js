<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
/* eslint-disable no-unused-vars */
>>>>>>> immersive
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
=======
>>>>>>> feature(refactoring):refactor the controllers
=======
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
>>>>>>> feature(authorization):plus feedback implementation
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
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
            message: 'Account owner does not exist',
=======
            error: 'Account owner does not exist',
>>>>>>> immersive
=======
            error: 'Account not created',
>>>>>>> feature(refactoring):refactor the controllers
          });
        }

<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
                console.log(result.rows, 'nothing');
                console.log(accountOwner);
=======
                // console.log(result.rows, 'nothing');
                // console.log(accountOwner);
>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
            res.status(200).json({
              status: 200,
            });
=======
            // res.status(200).json({
            // status: 200,
            // });
>>>>>>> immersive
            done();
          });
=======
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
>>>>>>> feature(refactoring):refactor the controllers
=======
            error: error.message,
          });
>>>>>>> feature(authorization):plus feedback implementation
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

<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
    console.log(accountStatus);
=======
    // console.log(accountStatus);
>>>>>>> immersive
    if (typeof accountStatus !== 'string') {
      res.status(400).json({
        status: 400,
        error: 'Invalid status supplied',
      });
      return;
    }
    if (accountStatus === undefined || accountStatus.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Status not supplied',
      });
      return;
    }

    // eslint-disable-next-line no-constant-condition
    if (accountStatus === 'dormant') {
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err);
        }
        client.query('UPDATE accounts SET status = $1 WHERE accountnumber = $2', [accountStatus, accountNumber], (err, result) => {
          if (err) {
            console.log(err);
          }
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
          console.log(result.rows);
=======
          // console.log(result.rows);
>>>>>>> immersive
=======
    const text = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2';
=======
    const text = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2 RETURNING *';
>>>>>>> feature(authorization):plus feedback implementation
    const values = [accountStatus, accountNumber];

    // eslint-disable-next-line no-constant-condition
    if (accountStatus === 'dormant' || accountStatus === 'active') {
      db.query(text, values)
        .then((result) => {
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
          console.log(result.rows);
>>>>>>> feature(refactoring):refactor the controllers
          res.status(200).json({
            status: 200,
            data: {
              accountNumber,
              status: accountStatus,
            },
          });
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
        });
        done();
      });
    } else if (accountStatus === 'active') {
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err);
        }
        client.query('UPDATE accounts SET status = $1 WHERE accountnumber = $2', [accountStatus, accountNumber], (err, result) => {
          if (err) {
            console.log(err);
          }
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
          console.log(result.rows);
=======
          // console.log(result.rows);
>>>>>>> immersive
          res.status(200).json({
            status: 200,
            data: {
              accountNumber,
              status: accountStatus,
            },
=======
=======
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
>>>>>>> feature(authorization):plus feedback implementation
        })
        .catch((err) => {
          res.status(400).json({
            status: 400,
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
            error: err,
>>>>>>> feature(refactoring):refactor the controllers
=======
            error: `${err}, Account does not exist`,
>>>>>>> feature(authorization):plus feedback implementation
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

<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
    if (regExp.test(accountNumber)) {
      regExp.status(400).json({
        status: 400,
        error: 'Invalid account number supplied',
      });
    }

>>>>>>> immersive
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], (err, result) => {
        if (err) {
          console.log(err);
        }
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
        console.log(result.rows);
=======
        // console.log(result.rows);
>>>>>>> immersive
        if (result.rows.length < 1) {
          res.status(404).json({
            status: 404,
            error: 'Account not available',
          });
          return;
        }

        pool.connect((err, client, done) => {
          if (err) {
            console.log(err);
          }
          client.query('DELETE FROM accounts WHERE accountnumber = $1', [accountNumber], (err, result) => {
            if (err) {
              console.log(err);
            }
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
            console.log(result.rows);
=======
            // console.log(result.rows);
>>>>>>> immersive
            res.status(200).json({
              status: 200,
              message: `Account No: ${accountNumber} successfully deleted`,
            });
          });
          done();
=======
    const text = 'DELETE * FROM accounts WHERE accountnumber = $1';
=======
    const text = 'DELETE FROM accounts WHERE accountnumber = $1 RETURNING *';
>>>>>>> feature(authorization):plus feedback implementation
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
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
        res.status(404).json({
          status: 404,
          error: `${err} or Account not available`,
>>>>>>> feature(refactoring):refactor the controllers
        });
=======
        console.log(`${err}`);
>>>>>>> feature(authorization):plus feedback implementation
      });
  }


<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
  static listAllAccounts(req, res) {
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT * FROM accounts INNER JOIN users ON accounts.owner = users.id', (err, result) => {
        if (err) {
          console.log(err);
        }
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
        console.log(result.rows);
=======
=======
    const text = 'SELECT * FROM accounts INNER JOIN users ON accounts.owner = users.id';
    db.query(text)
      .then((result) => {
>>>>>>> feature(refactoring):refactor the controllers
        // console.log(result.rows);
>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
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
=======
=======
  static getTransactions(req, res) {
    const { accountNumber } = req.params;

    const text = 'SELECT * FROM transactions WHERE accountnumber = $1';
    const values = [accountNumber];

    db.query(text, values)
      .then((result) => {
        // if (result.rows.length > 0) {
>>>>>>> feature(authorization):plus feedback implementation
        res.status(200).json({
          status: 200,
          data: result.rows,
        });
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
>>>>>>> immersive
=======
      }).catch((err) => {
=======
        // } else {
        // res.status(400).json({
        // status: 400,
        // error: 'Not available',
        // });
        // }
      })
      .catch((err) => {
>>>>>>> feature(authorization):plus feedback implementation
        res.status(400).json({
          status: 400,
          error: `${err}, Account does not exist`,
        });
>>>>>>> feature(refactoring):refactor the controllers
      });
  }


  static listAccount(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.query;

    const text1 = 'SELECT * FROM accounts WHERE accountnumber = $1';
    const values1 = [accountNumber];
    const text2 = 'SELECT * FROM accounts WHERE status = $1';
    const values2 = [status];

<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
      // if no 'status' indicated as a req.query, proceed with get single account
>>>>>>> immersive
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
          console.log(result.rows);
=======
          // console.log(result.rows);
>>>>>>> immersive
          const account = result.rows.find(item => item.accountnumber === Number(accountNumber));

          if (!account) {
=======
    if (status === undefined) {
      // console.log('no status');

      db.query(text1, values1)
        .then((result) => {
          // console.log(result.rows);
          if (result.rows.length < 1) {
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
>>>>>>> feature(refactoring):refactor the controllers
            res.status(400).json({
              status: 400,
=======
            res.status(404).json({
              status: 404,
>>>>>>> feature(authorization):plus feedback implementation
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
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
      console.log('status available');
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
      if (req.query.status === 'active') {
        pool.connect((err, client, done) => {
          if (err) {
            console.log(err);
          }
          client.query('SELECT * FROM accounts WHERE status = $1', [req.query.status], (err, result) => {
            if (err) {
              console.log(err);
            }
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
            console.log(result.rows);
            if (result.rows.length < 1) {
              res.status(204).json({
                status: 204,
                error: 'No ACTIVE BANK ACCOUNTS available',
              });
              return;
            }
=======
=======
=======
      // console.log('status available');
      // eslint-disable-next-line no-lonely-if
>>>>>>> feature(authorization):plus feedback implementation
      if (status === 'active' || status === 'dormant') {
        db.query(text2, values2)
          .then((result) => {
>>>>>>> feature(refactoring):refactor the controllers
            // console.log(result.rows);
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
>>>>>>> immersive
            res.status(200).json({
              status: 200,
              data: result.rows,
            });
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
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
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
            console.log(result.rows);
            if (result.rows.length < 1) {
              res.status(204).json({
                status: 204,
                error: 'No DORMANT BANK ACCOUNTS available',
              });
              return;
            }
=======
            // console.log(result.rows);
>>>>>>> immersive
            res.status(200).json({
              status: 200,
              data: result.rows,
=======
=======
            if (result.rows) {
              res.status(200).json({
                status: 200,
                data: result.rows,
              });
            }
>>>>>>> feature(authorization):plus feedback implementation
          })
          .catch((err) => {
            res.status(402).json({
              status: 402,
              error: err,
>>>>>>> feature(refactoring):refactor the controllers
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


<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
  static getTransactions(req, res) {
    const { accountNumber } = req.params;
    console.log(req.params);
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
    if (transactions !== 'transactions') {
      res.status(400).json({
        status: 400,
        error: 'Params can only be transactions',
      });
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======
      return;
>>>>>>> immersive
    }

    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT * FROM accounts WHERE accountnumber = $1', [accountNumber], (err, result) => {
        if (err) {
          console.log(err);
        }
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
        console.log(result.rows);
        console.log(accountNumber);
=======
        // console.log(result.rows);
        // console.log(accountNumber);
>>>>>>> immersive
=======
=======
  static getUserBankAccounts(req, res) {
    const { userEmailAddress } = req.params;
    const { accounts } = req.params;
>>>>>>> feature(authorization):plus feedback implementation

    // console.log(req.params);
    // console.log(userEmailAddress, accounts);

    const text = 'SELECT * FROM users INNER JOIN accounts ON users.id = accounts.owner WHERE EMAIL = $1';
    const values = [userEmailAddress];

    db.query(text, values)
      .then((result) => {
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
>>>>>>> feature(refactoring):refactor the controllers
=======
        // console.log(result.rows);
>>>>>>> feature(authorization):plus feedback implementation
        if (result.rows.length < 1) {
          res.status(400).json({
            status: 400,
            error: `User with email: '${userEmailAddress}' not found`,
          });
          return;
        }
<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
        pool.connect((err, client, done) => {
          if (err) {
            console.log(err);
          }
          client.query('SELECT * FROM transactions WHERE accountnumber = $1', [accountNumber], (err, result) => {
            if (err) {
              console.log(err);
            }
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
            console.log(result.rows);
=======
            // console.log(result.rows);
>>>>>>> immersive
            res.status(200).json({
              status: 200,
              data: result.rows,
            });
          });
          done();
=======
=======
        const list = result.rows.map(item => (
          {
            createdOn: item.createdon,
            accountNumber: item.accountnumber,
            type: item.type,
            status: item.status,
            balance: item.balance,
          }));
>>>>>>> feature(authorization):plus feedback implementation
        res.status(200).json({
          status: 200,
          accounts: list,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 400,
          error: err,
>>>>>>> feature(refactoring):refactor the controllers
        });
      });
  }

<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
=======

<<<<<<< 0f44f23620d1cb4fe92af264c33f0f4f2c96db9f
>>>>>>> immersive
  static getUserBankAccounts(req, res) {
    const { userEmailAddress } = req.params;
    const { accounts } = req.params;

    console.log(req.params);
    console.log(userEmailAddress, accounts);

    const text = 'SELECT * FROM users INNER JOIN accounts ON users.id = accounts.owner WHERE EMAIL = $1';
    const values = [userEmailAddress];

<<<<<<< 90b9be4179a5a95e628216ad9e542791a94821f7
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT * FROM users INNER JOIN accounts ON users.id = accounts.owner', (err, result) => {
        if (err) {
          console.log(err);
        }
<<<<<<< 70bdad15d0a750804b500167feaff32d7e5ee3aa
        console.log(result.rows);
=======
        // console.log(result.rows);
>>>>>>> immersive
        const userAccounts = result.rows.filter(item => item.email === userEmailAddress);
        if (userAccounts.length < 1) {
=======
    db.query(text, values)
      .then((result) => {
        // console.log(result.rows);
        if (result.rows.length < 1) {
>>>>>>> feature(refactoring):refactor the controllers
          res.status(400).json({
            status: 400,
            error: `User with email: '${userEmailAddress}' not found`,
          });
          return;
        }
        const list = result.rows.map(item => (
=======
  static listAllAccounts(req, res) {
    const text = 'SELECT * FROM accounts INNER JOIN users ON accounts.owner = users.id';
    db.query(text)
      .then((result) => {
        // console.log(result.rows);
        const newAccountArrray = result.rows.map(item => (
>>>>>>> feature(authorization):plus feedback implementation
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
