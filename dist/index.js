import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import users from './server/routers/users';
import accounts from './server/routers/accounts';
import transactions from './server/routers/transactions';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth/', users);
app.use('/api/v1/accounts', accounts);
app.use('/api/v1/transactions', transactions);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server started now');
});

export default app;