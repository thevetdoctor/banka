/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
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
  res.sendFile(path.join(__dirname.replace('dist', '\\index.html')));
  // res.sendFile(path.join(__dirname, '\\index.html'));
});


const swaggerDefinition = {
  info: {
    title: 'REST API for Banka', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for Banka', // short description of the app
  },
  host: 'localhost:3000', // the host or url of the app
  basePath: '/api/v1/', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// use swagger-Ui-express for your app documentation endpoint
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// copywright:
// https://medium.com/the-andela-way/splitting-your-swagger-spec-into-multiple-files-in-a-node-project-2019575b0ced

app.listen(port, () => {
  console.log(`server started now at port ${port}`);
  // console.log(path.join(__dirname.replace('src', '\\index.html')));
});

export default app;
