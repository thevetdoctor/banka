/* eslint-disable no-console */
import testDB from '../db/test-connect';

const createTestTables = () => {
  const text1 = 'CREATE TABLE accounts(id SERIAL PRIMARY KEY NOT NULL, accountNumber UNIQUE NOT NULL, createdOn DATE NOT NULL, owner INT NOT NULL, type TEXT NOT NULL, status TEXT NOT NULL, balance DECIMAL NOT NULL)';
  const text2 = 'CREATE TABLE users(id SERIAL PRIMARY KEY NOT NULL, email VARCHAR UNIQUE NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, password VARCHAR NOT NULL, hash VARCHAR NOT NULL, type TEXT NOT NULL, isAdmin BOOLEAN NOT NULL, sex TEXT NOT NULL, mobile TEXT NOT NULL, active BOOLEAN NOT NULL, createdDate DATE NOT NULL)';
  const text3 = 'CREATE TABLE transactions(id SERIAL PRIMARY KEY NOT NULL, accountnumber INT NOOT NULL, createdon DATE NOT NULL, owner INT NOT NULL, type TEXT NOT NULL, status TEXT NOT NULL, balance DECIMAL NOT NULL)';

  const text4 = 'DROP TABLE accounts';
  const text5 = 'DROP TABLE users';
  const text6 = 'DROP TABLE transactions';

  return testDB.query(text1, text2, text3)
    .then((result) => {
      console.log(result.rows);
    })
    .catch(err => err);
};

export default createTestTables;
