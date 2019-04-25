/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import users from './server/routers/users';
import accounts from './server/routers/accounts';
import transactions from './server/routers/transactions';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth/', users);
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/transactions', transactions);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname.replace('src', '\\index.html')));
  // res.sendFile(path.join(__dirname, '\\index.html'));
});

app.listen(port, () => {
  console.log('server started now');
  console.log(path.join(__dirname.replace('src', '\\index.html')));
});

export default app;
