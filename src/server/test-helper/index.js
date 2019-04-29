/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
// import testDB from '../db/connect';
import bcrypt from 'bcrypt';
import faker from 'faker';
import testDB from '../db/test-connect';

const accountNumberArrays = [faker.finance.account(), faker.finance.account(), faker.finance.account()];


const tables = {
  createTables: () => {
    const text2 = `CREATE TABLE IF NOT EXISTS accounts (
                id SERIAL PRIMARY KEY NOT NULL,
                accountnumber INT UNIQUE NOT NULL,
                createdon DATE NOT NULL,
                owner INT NOT NULL,
                type TEXT NOT NULL,
                status TEXT NOT NULL,
                balance DECIMAL NOT NULL);
                CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY NOT NULL,
                email VARCHAR UNIQUE NOT NULL,
                firstname TEXT NOT NULL,
                lastname TEXT NOT NULL,
                password VARCHAR NOT NULL,
                hash VARCHAR NOT NULL,
                type TEXT NOT NULL,
                isAdmin BOOLEAN NOT NULL,
                sex TEXT NOT NULL,
                mobile TEXT NOT NULL,
                active BOOLEAN NOT NULL,
                createdDate DATE NOT NULL);
                CREATE TABLE IF NOT EXISTS transactions (
                id SERIAL PRIMARY KEY NOT NULL,
                createdon DATE NOT NULL,
                type TEXT NOT NULL,
                accountnumber INT NOT NULL,
                cashier INT NOT NULL,
                amount DECIMAL NOT NULL,
                oldbalance DECIMAL NOT NULL,
                newbalance DECIMAL NOT NULL)`;


    testDB.query(text2)
      .then((result) => {
        console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  dropTables: () => {
    const text1 = `DROP TABLE IF EXISTS accounts;
                 DROP TABLE users;
                 DROP TABLE transactions`;


    testDB.query(text1)
      .then((result) => {
        console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  seedTables: () => {
    // seed users TABLE
    const text1 = `INSERT INTO users (
                  email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING  email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate`;
    const text2 = `INSERT INTO users (
                  email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    const text3 = `INSERT INTO users (
                  email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;

    const values1 = ['b@banka.com', 'firstName2', 'lastName2', 'password2', bcrypt.hashSync('password2', 10), 'client', true, 'M', '08022222222', false, '2019-04-11'];
    const values2 = ['admin@banka.com', 'firstName1', 'lastName1', 'password1', bcrypt.hashSync('password1', 10), 'admin', true, 'M', '08011111111', false, '2019-04-22'];
    const values3 = ['c@banka.com', 'firstName3', 'lastName3', 'password3', bcrypt.hashSync('password3', 10), 'cashier', true, 'M', '08033333333', false, '2019-04-22'];

    // seed accounts TABLE
    const text4 = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values4 = [accountNumberArrays[0], '2019-04-11', 1, 'savings', 'draft', 5300.00];

    const text5 = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values5 = [accountNumberArrays[1], '2019-04-11', 1, 'current', 'active', 100000.00];

    const text6 = 'INSERT INTO accounts (accountnumber, createdOn, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values6 = [accountNumberArrays[2], '2019-04-11', 1, 'savings', 'dormant', 25000.00];


    // seed transactions TABLE
    const text7 = 'INSERT INTO transactions (createdOn, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values7 = ['2019-04-11', 'credit', accountNumberArrays[0], 10, 20000.00, 0.00, 20000.00];

    const text8 = 'INSERT INTO transactions (createdOn, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING *';
    const values8 = ['2019-04-11', 'debit', accountNumberArrays[1], 10, 2000.00, 20000.00, 18000.00];

    const text9 = 'INSERT INTO transactions (createdOn, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values9 = ['2019-04-11', 'credit', accountNumberArrays[2], 10, 19000.00, 18000.00, 37000.00];


    testDB.query(text1, values1)
      .then((result) => {
        // console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    testDB.query(text2, values2)
      .then((result) => {
        // console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    testDB.query(text3, values3)
      .then((result) => {
        // console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    testDB.query(text4, values4)
      .then((result) => {
        // console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    testDB.query(text5, values5)
      .then((result) => {
        // console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    testDB.query(text6, values6)
      .then((result) => {
        // console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    testDB.query(text7, values7)
      .then((result) => {
        // console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    testDB.query(text8, values8)
      .then((result) => {
        // console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });

    testDB.query(text9, values9)
      .then((result) => {
        // console.log(result.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};


export default tables;
