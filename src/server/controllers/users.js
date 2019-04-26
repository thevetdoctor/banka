/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/users';
import db from '../db/connect';


class UserController {
  static signup(req, res) {
    const {
      email, firstName, lastName, password, sex, mobile,
    } = req.body;

    const user = new User(email, firstName, lastName, password, sex, mobile);
    const token = jwt.sign({ user }, 'secretKey', { expiresIn: '2h' });
    const hashed = bcrypt.hashSync(password, 10);

    const text = 'INSERT INTO users (email, firstName, lastName, password, hash, type, isAdmin, sex, mobile, active, createdDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
    const values = [email, firstName, lastName, password, hashed, user.type, user.isAdmin, sex, mobile, user.active, user.createdDate];

    db.query(text, values)
      .then((result) => {
        console.log(result.rows[0]);
        console.log('New User created');
        if (!result.rows[0]) {
          res.status(400).json({
            status: 400,
            error: 'Email already used',
          });
        }
        const { id, firstname, lastname, email } = result.rows[0];
        return res.status(201).json({
          status: 201,
          data: {
            token,
            id,
            firstname,
            lastname,
            email,
          },
          user,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.routine === '_bt_check_unique') {
          const error = 'Email already used';
          res.status(400).json({
            status: 400,
            error,
          });
        }
      });
  }


  static signin(req, res) {
    const { email, password } = req.body;
    const user = { email, password };
    // let position = 0;

    const text = 'SELECT email, firstname, lastname, password, hash FROM users WHERE email = $1';
    const values = [email];

    // Query User Record for credentials
    db.query(text, values)
      .then((result) => {
        console.log(result.rows[0]);
        if (!result.rows[0]) {
          res.status(400).json({
            status: 400,
            error: 'Invalid Email',
          });
        }
        const newUser = result.rows[0];
        console.log(newUser);
        const compared = bcrypt.compareSync(user.password, newUser.hash);
        if (!compared) {
          res.status(400).json({
            status: 400,
            error: 'Invalid password',
          });
        }
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
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  }
}


export default UserController;
