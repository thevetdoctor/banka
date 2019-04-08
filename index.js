const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./server/routers/users');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/users', users);

app.get('/', (req, res) => {
//   res.end('<h1>Welcome to Banka</h1><h4>...financial transactions at your convenience!</h4>');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('server started now');
});

module.exports = app;
