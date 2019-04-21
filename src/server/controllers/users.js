/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';
import User from '../models/users';

const pool = new pg.Pool(config);

const validUser = (user) => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(user.email) && user.email.trim() !== '';
  const validPassword = typeof user.password === 'string' && user.password.trim() !== '' && user.password.trim().length >= 6;
  return validEmail && validPassword;
};

const validateEmail = (email) => {
  const validEmail = /(.+)@(.+){2,}\.(.+){2,}/.test(email) && email.trim() !== '';
  return validEmail;
};

const mobileRegex = /[^0-9]/;


class UserController {
  static signup(req, res) {
    // eslint-disable-next-line object-curly-newline
    const { email, firstName, lastName, password, sex, mobile } = req.body;

    const user = new User(email, firstName, lastName, password, sex, mobile);
    console.log(user);
    if (user.firstName === undefined || user.firstName.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Firstname not supplied',
      });
      return;
    }

    if (user.lastName === undefined || user.lastName.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Lastname not supplied',
      });
      return;
    }

    if (user.email === undefined || user.email.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied',
      });
      return;
    }

    if (user.password === undefined || user.password.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied',
      });
      return;
    }

    if (user.sex === undefined || user.sex.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Sex not supplied',
      });
      return;
    }

    // if (user.sex !== 'M' || user.sex !== 'F') {
    //   res.status(400).json({
    //     status: 400,
    //     error: 'Invalid Sex supplied',
    //   });
    //   return;
    // }

    if (user.mobile === undefined || user.mobile.trim() === '') {
      res.status(400).json({
        status: 400,
        error: 'Mobile not supplied',
      });
      return;
    }

    if (mobileRegex.test(user.mobile)) {
      res.status(400).json({
        status: 400,
        error: 'Invalid Mobile Number supplied',
      });
      return;
    }

    // Validate Email
    if (!validateEmail(user.email)) {
      console.log(user.email);
      res.status(400).json({
        status: 400,
        error: 'Invalid Email',
      });
      return;
    }

    // check validity of user name & password
    if (validUser(user)) {
      pool.connect((err, client, done) => {
        if (err) {
          console.log(err);
        }
        client.query('SELECT email FROM users', (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result.rows);
          const newArr = result.rows.map(val => val.email.trim());
          console.log(newArr);

          if (newArr.includes(user.email)) {
            res.status(400).json({
              status: 400,
              error: 'Email already used',
            });
          } else {
            // Assign user ID
            user.id = newArr.length !== 0 ? newArr.length + 1 : 1;
            // save user in User Record
            const token = jwt.sign({ user }, 'secretKey', { expiresIn: '1min' });
            console.log('New email being registered');

            // encrypt the valid password with BCRYPT
            bcrypt.hash(user.password, 10)
              .then((hash) => {
                // connect to the db and save credentials
                pool.connect((err, client, done) => {
                  if (err) {
                    return console.error('error fetching ....', err);
                  }
                  client.query('INSERT INTO users (id, email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)', [user.id, user.email, user.firstName, user.lastName, user.password, hash, user.type, user.isAdmin, user.sex, user.mobile, user.active, user.createdDate], (err, result) => {
                    if (err) {
                      return console.error('error running query');
                    }
                    console.log(result.rows);
                    console.log('New User created');
                    res.status(201).json({
                      status: 201,
                      data: {
                        token,
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                      },
                    });
                  });
                  done();
                });
              });
          }
          done();
        });
      });
    // }
    } else {
    // send an error
      res.status(400).json({
        status: 400,
        error: 'Password must be minimum of 6 characters',
      });
    }
  }


  static signin(req, res) {
    const { email, password } = req.body;
    const user = { email, password };
    let position = 0;

    if (user.email === undefined || user.email === '') {
      res.status(400).json({
        status: 400,
        error: 'Email not supplied',
      });
      return;
    }

    if (user.password === undefined || user.password === '') {
      res.status(400).json({
        status: 400,
        error: 'Password not supplied',
      });
      return;
    }

    // Query User Record for credentials
    pool.connect((err, client, done) => {
      if (err) {
        console.log(err);
      }
      client.query('SELECT id, email, firstName, lastName, password, hash FROM users', (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result.rows);
        const contain = result.rows.map(val => val.email).map(val => val.trim());
        if (contain.includes(user.email)) {
          position = contain.indexOf(user.email);
        }
        console.log(position);
        console.log(result.rows[position].email);

        const newUser = result.rows[position];
        console.log(newUser);
        if (user.email === newUser.email.trim()) {
          if (user.password === newUser.password.trim()) {
            // bcrypt.compare(user.password, newUser.hash)
            // .then((result) => {
            // if (result) {
            delete newUser.password;
            const token = jwt.sign({ newUser }, 'secretKey', { expiresIn: '5min' });
            res.status(200).json({
              status: 200,
              data: {
                token,
                id: newUser.id,
                firstName: newUser.firstname,
                lastName: newUser.lastname,
                email: newUser.email,
              },
            });
            // }
            // });
          } else {
            res.status(400).json({
              status: 400,
              error: 'Invalid password',
            });
          }
        } else {
          res.status(400).json({
            status: 400,
            error: 'Invalid email',
          });
        }
        done();
      });
    });
  }
}


export default UserController;
